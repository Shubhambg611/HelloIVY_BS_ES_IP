import React, { useState } from 'react';

const LoginPage = ({ onBackToHome }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setMessage('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const endpoint = isLogin ? '/api/login' : '/api/register';
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          ...(formData.rememberMe && { rememberMe: true })
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`${isLogin ? 'Login' : 'Registration'} successful!`);
        if (isLogin && data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          
          // Redirect to dashboard or show success
          setTimeout(() => {
            alert(`Welcome ${data.user.email}! You have successfully ${isLogin ? 'logged in' : 'registered'}.`);
            // You can add dashboard navigation here later
          }, 1000);
        }
      } else {
        setMessage(data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Network error:', error);
      setMessage('Network error. Make sure the backend server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  // Eye icon components
  const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const EyeOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      fontFamily: 'Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
    }}>
      {/* Left Side - Illustration */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #eff6ff 0%, #f3e8ff 50%, #fdf2f8 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Back to Home Button - Top Left */}
        {onBackToHome && (
          <button
            onClick={onBackToHome}
            style={{
              position: 'absolute',
              top: '2rem',
              left: '2rem',
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              color: '#3b82f6',
              fontSize: '14px',
              cursor: 'pointer',
              padding: '10px 20px',
              borderRadius: '25px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              zIndex: 10
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'white';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.9)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </button>
        )}

        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.1
        }}>
          {/* Decorative background elements */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '15%',
            width: '60px',
            height: '60px',
            background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
            borderRadius: '50%',
            opacity: 0.3
          }}></div>
          <div style={{
            position: 'absolute',
            top: '60%',
            right: '20%',
            width: '40px',
            height: '40px',
            background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
            borderRadius: '50%',
            opacity: 0.4
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '30%',
            left: '25%',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(45deg, #ec4899, #f59e0b)',
            borderRadius: '50%',
            opacity: 0.2
          }}></div>
        </div>
        
        <div style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '28rem'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              width: '8rem',
              height: '8rem',
              margin: '0 auto 1.5rem',
              background: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              padding: '1rem'
            }}>
              {/* HelloIvy Logo */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '1.5rem',
                  height: '1.5rem',
                  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #fab1a0)',
                  borderRadius: '50%',
                  marginRight: '0.5rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '0.8rem',
                    height: '0.8rem',
                    background: 'white',
                    borderRadius: '50%'
                  }}></div>
                </div>
                <span style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  helloivy
                </span>
              </div>
            </div>
          </div>
          
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: 700,
            color: '#1f2937',
            marginBottom: '1rem'
          }}>Find Your Best Essay Ideas</h1>
          <p style={{
            color: '#4b5563',
            fontSize: '1.125rem',
            lineHeight: 1.625
          }}>
            Use smart tools to brainstorm topics that reflect your story and stand out.
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
            gap: '0.5rem'
          }}>
            <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#3b82f6' }}></div>
            <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#d1d5db' }}></div>
            <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#d1d5db' }}></div>
            <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#d1d5db' }}></div>
            <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#d1d5db' }}></div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem 2rem',
        backgroundColor: 'white'
      }}>
        <div style={{
          maxWidth: '28rem',
          margin: '0 auto',
          width: '100%'
        }}>
          {/* Logo */}
          <div style={{
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: '2rem',
                height: '2rem',
                position: 'relative',
                marginRight: '0.5rem'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #fab1a0)',
                  borderRadius: '50%',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '1rem',
                    height: '1rem',
                    background: 'white',
                    borderRadius: '50%'
                  }}></div>
                </div>
              </div>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#1f2937'
              }}>helloivy</span>
            </div>
          </div>

          {/* Form Header */}
          <div style={{
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '1.875rem',
              fontWeight: 700,
              color: '#111827',
              marginBottom: '0.5rem'
            }}>
              {isLogin ? 'Log In to Get Started' : 'Create Your Account'}
            </h2>
            <p style={{ color: '#4b5563' }}>
              {isLogin 
                ? 'Log in to access your essay tools, brainstorm ideas, and get started.'
                : 'Join us to access powerful essay writing tools and resources.'
              }
            </p>
          </div>

          {/* Toggle Login/Register */}
          <div style={{
            display: 'flex',
            marginBottom: '1.5rem',
            backgroundColor: '#f3f4f6',
            borderRadius: '0.5rem',
            padding: '0.25rem'
          }}>
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: isLogin ? 'white' : 'transparent',
                color: isLogin ? '#111827' : '#6b7280',
                boxShadow: isLogin ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
              }}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: !isLogin ? 'white' : 'transparent',
                color: !isLogin ? '#111827' : '#6b7280',
                boxShadow: !isLogin ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
              }}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="email" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Email ID
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                placeholder="Enter your email"
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="password" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    paddingRight: '3rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    transition: 'all 0.2s',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    padding: '0.25rem'
                  }}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="confirmPassword" style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    transition: 'all 0.2s',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            {isLogin && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    style={{
                      height: '1rem',
                      width: '1rem',
                      color: '#3b82f6',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.25rem',
                      marginRight: '0.5rem'
                    }}
                  />
                  <label htmlFor="rememberMe" style={{
                    fontSize: '0.875rem',
                    color: '#4b5563'
                  }}>
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  style={{
                    fontSize: '0.875rem',
                    color: '#3b82f6',
                    fontWeight: 500,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onClick={() => setMessage('Forgot password feature coming soon!')}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {message && (
              <div style={{
                padding: '0.75rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                backgroundColor: message.includes('successful') ? '#f0fdf4' : '#fef2f2',
                color: message.includes('successful') ? '#166534' : '#dc2626',
                border: `1px solid ${message.includes('successful') ? '#bbf7d0' : '#fecaca'}`
              }}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: loading ? '#9ca3af' : '#3b82f6',
                color: 'white',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                fontWeight: 500,
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s',
                opacity: loading ? 0.5 : 1
              }}
            >
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
            </button>
          </form>

          <div style={{
            marginTop: '1.5rem',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '0.875rem',
              color: '#4b5563'
            }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                style={{
                  color: '#3b82f6',
                  fontWeight: 500,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;