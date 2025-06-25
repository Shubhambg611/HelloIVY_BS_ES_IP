import React, { useState } from 'react';

const LandingPage = ({ onLoginClick }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    role: '',
    organisation: '',
    query: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission here
    alert('Thank you for your inquiry! We will get back to you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      role: '',
      organisation: '',
      query: ''
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ fontFamily: 'Manrope, sans-serif' }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #EAEAEA',
        padding: '15px 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 40px'
        }}>
          <a href="#intro" style={{
            fontSize: '28px',
            fontWeight: 800,
            color: '#222222',
            textDecoration: 'none'
          }}>
            hello<span style={{ color: '#4C4AF6' }}>ivy</span>
          </a>
          
          <nav>
            <ul style={{
              listStyle: 'none',
              display: 'flex',
              gap: '40px',
              margin: 0,
              padding: 0
            }}>
              <li><a href="#intro" onClick={(e) => { e.preventDefault(); scrollToSection('intro'); }} style={{ textDecoration: 'none', color: '#555555', fontWeight: 600, cursor: 'pointer' }}>Intro</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} style={{ textDecoration: 'none', color: '#555555', fontWeight: 600, cursor: 'pointer' }}>About Us</a></li>
              <li><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }} style={{ textDecoration: 'none', color: '#555555', fontWeight: 600, cursor: 'pointer' }}>Features</a></li>
              <li><a href="#users" onClick={(e) => { e.preventDefault(); scrollToSection('users'); }} style={{ textDecoration: 'none', color: '#555555', fontWeight: 600, cursor: 'pointer' }}>Users</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} style={{ textDecoration: 'none', color: '#555555', fontWeight: 600, cursor: 'pointer' }}>Contact Us</a></li>
            </ul>
          </nav>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button
              onClick={onLoginClick}
              style={{
                backgroundColor: '#10E5C8',
                color: '#2E3B8D',
                fontWeight: 700,
                padding: '12px 28px',
                borderRadius: '25px',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Login / Register
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Intro Section */}
        <section id="intro" style={{ padding: '120px 0', backgroundColor: '#ffffff' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              alignItems: 'center',
              gap: '60px'
            }}>
              <div>
                <h1 style={{
                  fontSize: '56px',
                  fontWeight: 800,
                  lineHeight: 1.2,
                  marginBottom: '20px',
                  color: '#222222'
                }}>
                  Your <span style={{
                    background: 'linear-gradient(90deg, #A16BFE, #E842A5)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>AI Powered</span> Platform for Career & Educational Success
                </h1>
                <p style={{
                  fontSize: '18px',
                  color: '#555555',
                  maxWidth: '500px'
                }}>
                  Empowering schools & colleges with personalized, data-driven guidance—from career discovery to college admission—backed by 14+ years of expertise.
                </p>
              </div>
              <div>
                <img 
                  src="https://i.imgur.com/GgS0qfF.png" 
                  alt="AI Platform for Education"
                  style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" style={{ padding: '80px 0', backgroundColor: '#F8F9FE' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <span style={{
                display: 'inline-block',
                padding: '6px 16px',
                border: '1px solid #ddd',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '16px'
              }}>ABOUT US</span>
              <h2 style={{
                fontSize: '42px',
                fontWeight: 800,
                background: 'linear-gradient(90deg, #6B68FE, #312ED0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '20px'
              }}>
                Where Human Expertise <span style={{
                  background: 'linear-gradient(90deg, #A16BFE, #E842A5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Meets AI</span>
              </h2>
              <p style={{
                maxWidth: '800px',
                margin: '20px auto 0',
                color: '#555555',
                fontSize: '16px'
              }}>
                An AI-powered platform built to elevate counselors, empower students, and transform the career discovery journey. Designed as a smart co-pilot, it delivers personalized, data-driven support to help students uncover passions, build standout profiles, and gain admission to top global universities.
              </p>
            </div>

            {/* University Logos */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '40px 0',
              filter: 'grayscale(100%)',
              opacity: 0.7
            }}>
              <img src="https://i.imgur.com/gK9xavP.png" alt="Oxford" style={{ height: '40px' }} />
              <img src="https://i.imgur.com/rN9gB7r.png" alt="Stanford" style={{ height: '40px' }} />
              <img src="https://i.imgur.com/6U4t62y.png" alt="UCLA" style={{ height: '40px' }} />
              <img src="https://i.imgur.com/3DAmSP8.png" alt="MIT" style={{ height: '40px' }} />
              <img src="https://i.imgur.com/2mU3UuX.png" alt="Georgia Tech" style={{ height: '40px' }} />
              <img src="https://i.imgur.com/tHqgGz4.png" alt="Michigan" style={{ height: '40px' }} />
            </div>

            {/* Founder Section */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '80px',
              alignItems: 'center',
              marginTop: '80px'
            }}>
              <div style={{ position: 'relative', padding: '20px' }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '400px',
                  margin: '0 auto'
                }}>
                  <img 
                    src="https://i.imgur.com/2X8p1sH.png" 
                    alt="Vibha Kagzi, Founder & CEO"
                    style={{ width: '100%', borderRadius: '50%' }}
                  />
                </div>
                <div style={{
                  background: '#ffffff',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  padding: '40px',
                  borderRadius: '20px',
                  marginTop: '-60px',
                  position: 'relative',
                  zIndex: 2,
                  textAlign: 'center'
                }}>
                  <p style={{
                    fontSize: '20px',
                    fontStyle: 'italic',
                    fontWeight: 500,
                    marginBottom: '10px'
                  }}>
                    "We're not here to sell dreams. We're here to architect reality."
                  </p>
                  <p style={{
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    color: '#555555'
                  }}>
                    — Vibha Kagzi, Founder & CEO
                  </p>
                </div>
              </div>
              <div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  marginBottom: '10px'
                }}>Who we are:</h3>
                <p style={{ color: '#555555', marginBottom: '20px' }}>
                  A company born from the expertise of Reachivy.com — trusted advisors to the dreamers, the doers, and the disruptors of tomorrow.
                </p>
                <p style={{ color: '#555555', marginBottom: '20px' }}>
                  For over 14+ yrs, we've guided thousands of students to top universities and careers around the world. Trusted by thousands of students to navigate their academic and professional journeys. Now, we are harnessing the power of AI to revolutionize how career and college guidance is delivered in institutions worldwide.
                </p>
                <p style={{ color: '#555555' }}>
                  We're taking it a step further.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <span style={{
                display: 'inline-block',
                padding: '6px 16px',
                border: '1px solid #ddd',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '16px'
              }}>FEATURES</span>
              <h2 style={{
                fontSize: '42px',
                fontWeight: 800,
                background: 'linear-gradient(90deg, #6B68FE, #312ED0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Smart Features That Transform Education Planning
              </h2>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.5fr',
              gap: '60px',
              alignItems: 'center'
            }}>
              <ul style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                padding: 0,
                margin: 0
              }}>
                {[
                  { icon: '🛡️', text: 'Career Discovery' },
                  { icon: '📄', text: 'Profile Builder' },
                  { icon: '🎓', text: 'Degree Selector' },
                  { icon: '📍', text: 'College Selection' },
                  { icon: '✍️', text: 'Essay Brainstormer' }
                ].map((feature, index) => (
                  <li key={index} style={{
                    padding: '20px',
                    fontWeight: 600,
                    fontSize: '18px',
                    borderLeft: '4px solid #2E3B8D',
                    backgroundColor: '#ffffff',
                    borderRadius: '0 8px 8px 0',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                  }}>
                    <span style={{ fontSize: '24px' }}>{feature.icon}</span>
                    {feature.text}
                  </li>
                ))}
              </ul>
              
              <div>
                <img 
                  src="https://i.imgur.com/uC57Uv6.png" 
                  alt="Feature Screenshot"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '20px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Users Section */}
        <section id="users" style={{ padding: '80px 0', backgroundColor: '#F8F9FE' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <span style={{
                display: 'inline-block',
                padding: '6px 16px',
                border: '1px solid #ddd',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '16px'
              }}>USERS</span>
              <h2 style={{
                fontSize: '42px',
                fontWeight: 800,
                background: 'linear-gradient(90deg, #6B68FE, #312ED0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Built for Every Role in the <span style={{
                  background: 'linear-gradient(90deg, #A16BFE, #E842A5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Education Journey</span>
              </h2>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '40px',
              textAlign: 'center'
            }}>
              {[
                {
                  image: 'https://i.imgur.com/4qK9G2F.png',
                  title: 'Students',
                  features: ['24x7 Personalised Guidance', 'Ivy-League level Expertise', 'Conversational Experience']
                },
                {
                  image: 'https://i.imgur.com/qR56kGg.png',
                  title: 'Educational Institutes',
                  features: ['Improved Student Outcomes', 'Scalable Support System', 'White-Labeled Solution']
                },
                {
                  image: 'https://i.imgur.com/B94FpYV.png',
                  title: 'Counsellors',
                  features: ['AI-Powered Co-Pilot', '80% Less Admin Time', 'Real-Time Dashboards']
                }
              ].map((user, index) => (
                <div key={index} style={{ padding: '30px' }}>
                  <img 
                    src={user.image} 
                    alt={user.title}
                    style={{ height: '150px', marginBottom: '20px' }}
                  />
                  <h3 style={{
                    fontSize: '24px',
                    marginBottom: '15px',
                    fontWeight: 700
                  }}>{user.title}</h3>
                  <ul style={{
                    listStyle: 'none',
                    textAlign: 'left',
                    color: '#555555',
                    paddingLeft: '20px',
                    margin: 0
                  }}>
                    {user.features.map((feature, idx) => (
                      <li key={idx} style={{
                        position: 'relative',
                        paddingLeft: '25px',
                        marginBottom: '10px'
                      }}>
                        <span style={{
                          content: '✔',
                          color: '#10E5C8',
                          fontWeight: 'bold',
                          position: 'absolute',
                          left: 0
                        }}>✔</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" style={{ padding: '80px 0 100px', backgroundColor: '#ffffff' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.5fr',
              gap: '80px',
              background: '#ffffff',
              padding: '60px',
              borderRadius: '20px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.07)'
            }}>
              <div>
                <h2 style={{
                  fontSize: '48px',
                  fontWeight: 800,
                  marginBottom: '20px',
                  lineHeight: 1.2,
                  background: 'linear-gradient(90deg, #A16BFE, #E842A5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Contact Us</h2>
                <p style={{ color: '#555555', marginBottom: '20px' }}>
                  Are you a student, parent, or educator inspired by our mission?
                </p>
                <p style={{ color: '#555555' }}>
                  If you're exploring job opportunities and want to be part of our team, get in touch at{' '}
                  <a href="mailto:careers@helloivy.com" style={{ color: '#2E3B8D', fontWeight: 600, textDecoration: 'none' }}>
                    careers@helloivy.com
                  </a>
                </p>
              </div>
              
              <form onSubmit={handleSubmit} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
                    First name <span style={{ color: '#E842A5' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    style={{
                      padding: '12px 15px',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontFamily: 'Manrope, sans-serif'
                    }}
                  />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
                    Last Name <span style={{ color: '#E842A5' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    style={{
                      padding: '12px 15px',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontFamily: 'Manrope, sans-serif'
                    }}
                  />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
                    Email address <span style={{ color: '#E842A5' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      padding: '12px 15px',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontFamily: 'Manrope, sans-serif'
                    }}
                  />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
                    Mobile no. <span style={{ color: '#E842A5' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                    style={{
                      padding: '12px 15px',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontFamily: 'Manrope, sans-serif'
                    }}
                  />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
                    You are a <span style={{ color: '#E842A5' }}>*</span>
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    style={{
                      padding: '12px 15px',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontFamily: 'Manrope, sans-serif'
                    }}
                  >
                    <option value="">Select your role</option>
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                    <option value="educator">Educator</option>
                  </select>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
                    Organisation/Institution name <span style={{ color: '#E842A5' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="organisation"
                    value={formData.organisation}
                    onChange={handleInputChange}
                    style={{
                      padding: '12px 15px',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontFamily: 'Manrope, sans-serif'
                    }}
                  />
                </div>
                
                <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontWeight: 600, marginBottom: '8px', fontSize: '14px' }}>
                    Query <span style={{ color: '#E842A5' }}>*</span>
                  </label>
                  <textarea
                    name="query"
                    value={formData.query}
                    onChange={handleInputChange}
                    required
                    style={{
                      padding: '12px 15px',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontFamily: 'Manrope, sans-serif',
                      minHeight: '120px',
                      resize: 'vertical'
                    }}
                  />
                </div>
                
                <div style={{ gridColumn: '1 / -1' }}>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#4C4AF6',
                      color: 'white',
                      padding: '12px 28px',
                      borderRadius: '25px',
                      border: 'none',
                      fontSize: '16px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontFamily: 'Manrope, sans-serif'
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#2E3B8D',
        color: '#ffffff',
        padding: '40px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <p style={{ fontSize: '14px', opacity: 0.8, margin: 0 }}>
              © 2025. All rights reserved |{' '}
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Privacy policy</a> |{' '}
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Terms & Condition</a>
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Partner With Us</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Media</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>Blogs</a>
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="#" style={{ color: 'white', opacity: 0.8, fontSize: '20px' }}>📘</a>
              <a href="#" style={{ color: 'white', opacity: 0.8, fontSize: '20px' }}>📷</a>
              <a href="#" style={{ color: 'white', opacity: 0.8, fontSize: '20px' }}>💼</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;