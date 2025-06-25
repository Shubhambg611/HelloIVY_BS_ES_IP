# app.py - Flask Backend for HelloIvy Login System

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import sqlite3
import os
from datetime import datetime, timedelta
import re

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your-secret-key-change-this-in-production'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)

# SQLite database file
DATABASE = 'helloivy.db'

def get_db_connection():
    """Create and return a database connection"""
    try:
        conn = sqlite3.connect(DATABASE)
        conn.row_factory = sqlite3.Row
        return conn
    except Exception as e:
        print(f"Error connecting to database: {e}")
        return None

def init_database():
    """Initialize the database and create tables if they don't exist"""
    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            
            # Create users table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT UNIQUE NOT NULL,
                    password_hash TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    last_login TIMESTAMP,
                    is_active BOOLEAN DEFAULT 1
                )
            ''')
            
            # Create user_sessions table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS user_sessions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    session_token TEXT,
                    expires_at TIMESTAMP,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                )
            ''')
            
            conn.commit()
            print("✅ Database tables created successfully")
            
        except Exception as e:
            print(f"❌ Error creating tables: {e}")
        finally:
            conn.close()

def is_valid_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

@app.route('/api/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        print(f"📝 Registration attempt: {data}")
        
        # Validate input
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'message': 'Email and password are required'}), 400
        
        email = data['email'].lower().strip()
        password = data['password']
        
        # Validate email format
        if not is_valid_email(email):
            return jsonify({'message': 'Invalid email format'}), 400
        
        # Validate password strength
        if len(password) < 6:
            return jsonify({'message': 'Password must be at least 6 characters long'}), 400
        
        # Check if user already exists
        conn = get_db_connection()
        if not conn:
            return jsonify({'message': 'Database connection failed'}), 500
        
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
        existing_user = cursor.fetchone()
        
        if existing_user:
            conn.close()
            return jsonify({'message': 'User already exists with this email'}), 409
        
        # Hash password and create user
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        
        cursor.execute(
            "INSERT INTO users (email, password_hash) VALUES (?, ?)",
            (email, password_hash)
        )
        conn.commit()
        
        # Get the new user ID
        user_id = cursor.lastrowid
        conn.close()
        
        # Create access token
        access_token = create_access_token(identity=str(user_id))
        
        print(f"✅ User registered successfully: {email}")
        
        return jsonify({
            'message': 'User registered successfully',
            'token': access_token,
            'user': {
                'id': user_id,
                'email': email
            }
        }), 201
        
    except Exception as e:
        print(f"❌ Registration error: {str(e)}")
        return jsonify({'message': f'Server error: {str(e)}'}), 500

@app.route('/api/login', methods=['POST'])
def login():
    """Login user"""
    try:
        data = request.get_json()
        print(f"🔐 Login attempt: {data.get('email', 'No email') if data else 'No data'}")
        
        # Validate input
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'message': 'Email and password are required'}), 400
        
        email = data['email'].lower().strip()
        password = data['password']
        remember_me = data.get('rememberMe', False)
        
        # Get user from database
        conn = get_db_connection()
        if not conn:
            return jsonify({'message': 'Database connection failed'}), 500
        
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, email, password_hash, is_active FROM users WHERE email = ?", 
            (email,)
        )
        user = cursor.fetchone()
        
        if not user or not bcrypt.check_password_hash(user[2], password):
            conn.close()
            return jsonify({'message': 'Invalid email or password'}), 401
        
        # Check if user is active
        if not user[3]:
            conn.close()
            return jsonify({'message': 'Account is deactivated'}), 401
        
        # Update last login
        cursor.execute(
            "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?", 
            (user[0],)
        )
        conn.commit()
        conn.close()
        
        # Create access token with extended expiry if remember me is checked
        expires = timedelta(days=30) if remember_me else timedelta(hours=24)
        access_token = create_access_token(
            identity=str(user[0]),
            expires_delta=expires
        )
        
        print(f"✅ User logged in successfully: {email}")
        
        return jsonify({
            'message': 'Login successful',
            'token': access_token,
            'user': {
                'id': user[0],
                'email': user[1]
            }
        }), 200
        
    except Exception as e:
        print(f"❌ Login error: {str(e)}")
        return jsonify({'message': f'Server error: {str(e)}'}), 500

@app.route('/api/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get user profile (protected route)"""
    try:
        user_id = get_jwt_identity()
        
        conn = get_db_connection()
        if not conn:
            return jsonify({'message': 'Database connection failed'}), 500
        
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, email, created_at, last_login FROM users WHERE id = ?", 
            (user_id,)
        )
        user = cursor.fetchone()
        conn.close()
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        return jsonify({
            'user': {
                'id': user[0],
                'email': user[1],
                'created_at': user[2],
                'last_login': user[3]
            }
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Server error: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'message': 'Server is running', 'status': 'healthy'}), 200

@app.route('/api/users', methods=['GET'])
def get_users():
    """Get all users (for testing)"""
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({'message': 'Database connection failed'}), 500
        
        cursor = conn.cursor()
        cursor.execute("SELECT id, email, created_at, last_login FROM users")
        users = cursor.fetchall()
        conn.close()
        
        users_list = []
        for user in users:
            users_list.append({
                'id': user[0],
                'email': user[1],
                'created_at': user[2],
                'last_login': user[3]
            })
        
        return jsonify({'users': users_list}), 200
        
    except Exception as e:
        return jsonify({'message': f'Server error: {str(e)}'}), 500

if __name__ == '__main__':
    # Initialize database on startup
    print("🚀 Starting HelloIvy Backend Server...")
    init_database()
    
    print("📊 Database: SQLite")
    print("🌐 Server: http://localhost:5000")
    print("🔗 Health Check: http://localhost:5000/api/health")
    print("👥 Users endpoint: http://localhost:5000/api/users")
    print("=" * 50)
    
    app.run(debug=True, host='0.0.0.0', port=5000)