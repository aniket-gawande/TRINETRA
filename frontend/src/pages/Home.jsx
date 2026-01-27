import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.css";
import "./Home.css";
import roveImg from "../public/rove.png";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Navigate to login with role
  const handleFarmerLogin = () => {
    navigate('/login', { state: { role: 'farmer' } });
  };

  const handleAdminLogin = () => {
    navigate('/login', { state: { role: 'admin' } });
  };

  return (
    <div className="home-container" style={{ paddingTop: '80px', overflowX: 'hidden' }}>
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative', paddingBottom: '4rem' }}>
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', background: 'var(--primary)', filter: 'blur(150px)', opacity: '0.15', zIndex: '-1', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '400px', height: '400px', background: 'var(--accent)', filter: 'blur(150px)', opacity: '0.1', zIndex: '-1', borderRadius: '50%' }}></div>

        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          
          <div className="hero-content" style={{ zIndex: 1 }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.2rem', 
              background: 'rgba(16, 185, 129, 0.1)', 
              borderRadius: '30px', 
              color: 'var(--primary)', 
              marginBottom: '1.5rem', 
              fontWeight: '600', 
              fontSize: '0.9rem',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              backdropFilter: 'blur(5px)'
            }}>
              <span style={{ position: 'relative', display: 'flex', height: '10px', width: '10px' }}>
                <span style={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', position: 'absolute', height: '100%', width: '100%', borderRadius: '50%', background: 'var(--primary)', opacity: 0.75 }}></span>
                <span style={{ position: 'relative', height: '10px', width: '10px', borderRadius: '50%', background: 'var(--primary)' }}></span>
              </span>
              AI on Wheels for Climate Action
            </div>
            
            <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Monitor the Future <br />
              <span className="text-gradient">with PARYARAK</span>
            </h1>
            
            <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '580px', lineHeight: '1.8' }}>
              Real-time environmental monitoring, smart rover deployment, and AI-driven insights to build sustainable, climate-resilient agricultural systems.
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/planner')} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
                🗺️ Launch Live Map
              </button>
              <button onClick={() => navigate('/dashboard')} className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
                📊 View Analytics
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
             <div className="floating-img" style={{ 
              width: '100%',
              maxWidth: '550px',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              position: 'relative',
              zIndex: 2
            }}>
              <img 
                src={roveImg} 
                alt="PARYARAK Rover" 
                style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))', transform: 'perspective(1000px) rotateY(-10deg)' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== DUAL LOGIN SECTION (ONLY BEFORE LOGIN) ==================== */}
      {!user && (
        <section className="section" style={{ 
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(2, 6, 23, 0.9) 100%)',
          padding: '6rem 0 3rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--primary), transparent)' }}></div>
          
          <div className="container">
            {/* Section Header */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ 
                fontSize: 'clamp(2rem, 4vw, 3rem)', 
                fontWeight: '800', 
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #fff 0%, var(--primary) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Choose Your Portal
              </h2>
              <p style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                Access specialized dashboards designed for your role
              </p>
            </div>

            {/* Login Cards Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '3rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              
              {/* FARMER LOGIN CARD */}
              <div className="glass-card" style={{ 
                padding: 'clamp(2rem, 4vw, 2.5rem)',
                textAlign: 'center',
                background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.12) 0%, rgba(20, 40, 30, 0.8) 100%)',
                border: '2px solid rgba(16, 185, 129, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(16, 185, 129, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🌾</div>
                
                <h3 style={{ 
                  fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', 
                  fontWeight: 'bold', 
                  color: 'var(--primary)', 
                  marginBottom: '1rem'
                }}>
                  Farmer Portal
                </h3>
                
                <p style={{ 
                  color: 'var(--text-muted)', 
                  marginBottom: '2rem', 
                  lineHeight: '1.7',
                  fontSize: '0.95rem'
                }}>
                  Access real-time climate data, receive disaster alerts, and optimize farming decisions with AI-powered insights.
                </p>

                <div style={{ 
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  background: 'rgba(16, 185, 129, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  textAlign: 'left'
                }}>
                  <div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.8rem' }}>
                    ✅ Real-time Sensor Data
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.8rem' }}>
                    ✅ Weather Predictions
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                    ✅ Disaster Alerts
                  </div>
                </div>

                <button 
                  onClick={handleFarmerLogin}
                  style={{
                    width: '100%',
                    padding: 'clamp(0.75rem, 1.5vw, 1rem)',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: 'clamp(0.95rem, 2vw, 1rem)',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '44px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(16, 185, 129, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)';
                  }}
                >
                  🌱 Login as Farmer
                </button>
              </div>

              {/* ADMIN/GOVERNMENT LOGIN CARD */}
              <div className="glass-card" style={{ 
                padding: 'clamp(2rem, 4vw, 2.5rem)',
                textAlign: 'center',
                background: 'linear-gradient(145deg, rgba(245, 158, 11, 0.12) 0%, rgba(40, 30, 20, 0.8) 100%)',
                border: '2px solid rgba(245, 158, 11, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(245, 158, 11, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.3)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🏛️</div>
                
                <h3 style={{ 
                  fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', 
                  fontWeight: 'bold', 
                  color: 'var(--accent)', 
                  marginBottom: '1rem'
                }}>
                  Admin Portal
                </h3>
                
                <p style={{ 
                  color: 'var(--text-muted)', 
                  marginBottom: '2rem', 
                  lineHeight: '1.7',
                  fontSize: '0.95rem'
                }}>
                  Monitor regional climate patterns, manage rover deployments, and coordinate disaster response with comprehensive analytics.
                </p>

                <div style={{ 
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  background: 'rgba(245, 158, 11, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                  textAlign: 'left'
                }}>
                  <div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.8rem' }}>
                    ✅ City-Wide Analytics
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.8rem' }}>
                    ✅ Rover Fleet Management
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                    ✅ Policy Insights
                  </div>
                </div>

                <button 
                  onClick={handleAdminLogin}
                  style={{
                    width: '100%',
                    padding: 'clamp(0.75rem, 1.5vw, 1rem)',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: 'clamp(0.95rem, 2vw, 1rem)',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(245, 158, 11, 0.4)',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '44px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(245, 158, 11, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.4)';
                  }}
                >
                  🏛️ Login as Admin
                </button>
              </div>

            </div>

            {/* Additional Info */}
            <div style={{ 
              textAlign: 'center', 
              marginTop: '3rem',
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                🔒 Secure authentication powered by Firebase • 
                Role-based access control • 
                Real-time data synchronization
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ==================== ABOUT SECTION ==================== */}
      <section className="section" style={{ 
        background: 'rgba(16, 185, 129, 0.02)',
        padding: '5rem 0',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--primary), transparent)' }}></div>
        
        <div className="container">
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: '800', 
              marginBottom: '1rem'
            }}>
              About PARYARAK
            </h2>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
              An AI-powered autonomous rover designed to revolutionize climate monitoring and agricultural sustainability
            </p>
          </div>

          {/* Problem Statement */}
          <div style={{ marginBottom: '5rem' }}>
            <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: '700', marginBottom: '2rem', color: 'var(--primary)' }}>
              🌾 Problem Statement
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '2rem'
            }}>
              {[
                { title: 'Soil Erosion', icon: '🌪️', desc: 'Degradation of agricultural land due to climate variability' },
                { title: 'Rainfall', icon: '🌧️', desc: 'Unpredictable precipitation patterns affecting crops' },
                { title: 'Optimals', icon: '🌡️', desc: 'Fluctuating optimal growing conditions' },
                { title: 'Low Soil Adoption', icon: '⬇️', desc: 'Poor adoption of soil conservation practices' }
              ].map((item, idx) => (
                <div key={idx} className="glass-card" style={{ 
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(30, 41, 59, 0.8) 100%)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.icon}</div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>{item.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div>
            <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: '700', marginBottom: '2rem', color: 'var(--primary)' }}>
              ⚙️ How It Works
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '2rem'
            }}>
              {[
                { num: '1', title: 'Mark Path on Map', desc: 'Farmers and admins define GPS coordinates for rover deployment', icon: '🗺️' },
                { num: '2', title: 'Rover Collects Data', desc: 'PARYARAK autonomously travels and gathers real-time sensor readings', icon: '🤖' },
                { num: '3', title: 'AI Generates Report', desc: 'Machine learning analyzes data to provide actionable agricultural insights', icon: '🧠' }
              ].map((item, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <div className="glass-card" style={{ 
                    padding: 'clamp(2rem, 4vw, 2.5rem)',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(30, 41, 59, 0.9) 100%)',
                    border: '2px solid rgba(16, 185, 129, 0.3)',
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: '70px',
                      height: '70px',
                      background: 'linear-gradient(135deg, var(--primary) 0%, rgba(16, 185, 129, 0.5) 100%)',
                      borderRadius: '50%',
                      marginBottom: '1.5rem',
                      margin: '0 auto 1.5rem',
                      fontSize: '2rem'
                    }}>
                      {item.icon}
                    </div>
                    <h4 style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: '700', marginBottom: '1rem' }}>
                      {item.title}
                    </h4>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                      {item.desc}
                    </p>
                  </div>
                  {idx < 2 && (
                    <div style={{ 
                      position: 'absolute', 
                      right: '-30px', 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      fontSize: '2rem',
                      color: 'var(--primary)'
                    }}>
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section className="section" style={{ 
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(2, 6, 23, 0.8) 100%)',
        padding: '5rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--primary), transparent)' }}></div>
        
        <div className="container">
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: '800', 
              marginBottom: '1rem'
            }}>
              Key Features
            </h2>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
              Comprehensive tools for modern agricultural climate management
            </p>
          </div>

          {/* Features Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem'
          }}>
            {[
              { icon: '📡', title: 'Real-Time Monitoring', desc: 'Live sensor data from rovers with instant alerts' },
              { icon: '🗺️', title: 'Smart Map Planner', desc: 'Intuitive interface to define rover paths and routes' },
              { icon: '📊', title: 'Analytics Dashboard', desc: 'Comprehensive data visualization and trends' },
              { icon: '🤖', title: 'AI Insights', desc: 'Machine learning powered recommendations' },
              { icon: '🌦️', title: 'Weather Integration', desc: 'Real-time weather data and predictions' },
              { icon: '🔐', title: 'Secure Access', desc: 'Firebase authentication with role-based control' }
            ].map((feature, idx) => (
              <div key={idx} className="glass-card" style={{ 
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(30, 41, 59, 0.6) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h4 style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', fontWeight: '600', marginBottom: '0.75rem' }}>
                  {feature.title}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== IMPACT SECTION ==================== */}
      <section className="section" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: '800', 
              marginBottom: '1rem'
            }}>
              Our Vision
            </h2>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
              Building sustainable, climate-resilient agricultural systems through technology
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem',
            maxWidth: '1100px',
            margin: '0 auto'
          }}>
            {[
              { number: '🌍', title: 'Global Impact', desc: 'Supporting farmers worldwide' },
              { number: '📈', title: 'Data-Driven', desc: 'Intelligent decision making' },
              { number: '♻️', title: 'Sustainable', desc: 'Climate action focused' },
              { number: '🚀', title: 'Innovative', desc: 'Cutting-edge AI technology' }
            ].map((item, idx) => (
              <div key={idx} style={{ 
                textAlign: 'center',
                padding: 'clamp(2rem, 4vw, 2.5rem)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.number}</div>
                <h4 style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {item.title}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <section style={{ 
        background: 'rgba(0, 0, 0, 0.3)',
        borderTop: '1px solid rgba(16, 185, 129, 0.2)',
        padding: '3rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
            <strong>PARYARAK</strong> - AI on Wheels for Climate Action
          </p>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Building sustainable agricultural systems through smart technology
          </p>
        </div>
      </section>
      
    </div>
  );
};

export default Home;