import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Ensure you updated App.css as per the previous step

// Import the image from your src/public folder
// If this import fails, move 'rove.png' to the 'frontend/public' folder and change to: src="/rove.png"
import roveImg from "../public/rove.png"; 

// Simple icon components (You can replace these with an icon library if preferred)
const MapIcon = () => <span>🗺️</span>;
const DashboardIcon = () => <span>📊</span>;

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ paddingTop: '80px', overflowX: 'hidden' }}>
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
        {/* Background Ambient Glow */}
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', background: 'var(--primary)', filter: 'blur(150px)', opacity: '0.15', zIndex: '-1', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '400px', height: '400px', background: 'var(--accent)', filter: 'blur(150px)', opacity: '0.1', zIndex: '-1', borderRadius: '50%' }}></div>

        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          
          {/* Hero Text Content */}
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
              AI-Powered Climate Intelligence
            </div>
            
            <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Monitor the Future <br />
              <span className="text-gradient">with TRINETRA</span>
            </h1>
            
            <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '580px', lineHeight: '1.8' }}>
              Real-time environmental monitoring, smart rover deployment, and AI-driven insights to build sustainable, climate-resilient cities.
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/map')} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
                <MapIcon /> Launch Live Map
              </button>
              <button onClick={() => navigate('/dashboard')} className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
                <DashboardIcon /> View Analytics
              </button>
            </div>
          </div>

          {/* Hero Image (Rover) */}
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
                alt="Trinetra Rover" 
                style={{ width: '100%', height: 'auto', dropShadow: '0 30px 60px rgba(0,0,0,0.5)', transform: 'perspective(1000px) rotateY(-10deg)' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CLIMATE CHALLENGE SECTION ==================== */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>The <span className="text-gradient">Climate Challenge</span></h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>Current monitoring systems are static, slow, and reactive. We need a proactive solution.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            
            <div className="glass-card">
              <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '1.5rem' }}>🌫️</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Air Pollution</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>Stationary sensors fail to capture real-time street-level pollution variations, leaving hazardous zones undetected until it's too late.</p>
            </div>

            <div className="glass-card" style={{ border: '1px solid rgba(245, 158, 11, 0.3)', background: 'linear-gradient(145deg, rgba(245, 158, 11, 0.05) 0%, rgba(20, 40, 30, 0.4) 100%)' }}>
              <div style={{ width: '60px', height: '60px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '1.5rem' }}>🔥</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent)' }}>Delayed Detection</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>Satellite systems often detect fires and environmental hazards too late for effective rapid response in dense urban areas.</p>
            </div>

            <div className="glass-card">
              <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '1.5rem' }}>🌊</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Urban Flooding</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>Lack of granular, real-time water level monitoring leads to critical infrastructure failures during heavy rainfall events.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== OUR SOLUTION SECTION ==================== */}
      <section className="section" style={{ background: 'linear-gradient(180deg, transparent, rgba(16, 185, 129, 0.05), transparent)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '5rem', alignItems: 'center' }}>
            
            {/* Text Side */}
            <div style={{ order: 1 }}>
              <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                Our <span className="text-gradient">Green AI Solution</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.15rem', lineHeight: '1.8' }}>
                TRINETRA deploys an AI-enabled mobile rover equipped with advanced environmental sensors and computer vision to monitor air quality, fire risks, floods, and micro-climate conditions in real time.
              </p>
              
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {[
                  { title: '24/7 Street-Level Monitoring', desc: 'Granular data collection at the ground level.' },
                  { title: 'Predictive AI Hazard Detection', desc: 'Identify risks before they become disasters.' },
                  { title: 'Instant Alerts & Analytics', desc: 'Real-time notifications to stakeholders.' },
                  { title: 'Climate-Positive Impact', desc: 'Data-driven decisions for greener cities.' }
                ].map((item, index) => (
                  <div key={index} style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ 
                      minWidth: '24px', 
                      height: '24px', 
                      background: 'var(--primary)', 
                      borderRadius: '50%', 
                      display: 'flex',
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      color: '#000', 
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      marginTop: '4px'
                    }}>✓</div>
                    <div>
                      <h4 style={{ color: '#fff', fontWeight: '600', marginBottom: '0.2rem' }}>{item.title}</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Visual Side */}
            <div style={{ display: 'flex', justifyContent: 'center', order: 2 }}>
               <div style={{ 
                 position: 'relative',
                 fontSize: '15rem', 
                 filter: 'drop-shadow(0 0 60px var(--primary-glow))',
                 animation: 'float 6s ease-in-out infinite'
               }}>
                 🌱
                 {/* Orbiting Elements Animation */}
                 <div style={{ position: 'absolute', top: '50%', left: '50%', width: '120%', height: '120%', border: '1px dashed rgba(16, 185, 129, 0.3)', borderRadius: '50%', transform: 'translate(-50%, -50%)', animation: 'spin 20s linear infinite' }}></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== KEY FEATURES SECTION ==================== */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Key <span className="text-gradient">Features</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            
            {[
              { icon: "📡", title: "Real-Time Data", desc: "Live sensor streaming via MQTT protocols for instant updates." },
              { icon: "🤖", title: "AI Detection", desc: "Advanced Computer Vision models to identify hazards instantly." },
              { icon: "🗺️", title: "Heat Maps", desc: "Interactive geographic visualization of environmental risks." },
              { icon: "🚨", title: "Smart Alerts", desc: "Instant push notifications for critical threshold breaches." }
            ].map((feature, idx) => (
              <div key={idx} className="glass-card" style={{ textAlign: 'center', padding: '3rem 2rem', transition: '0.3s' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))' }}>{feature.icon}</div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#fff', marginBottom: '1rem' }}>{feature.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>{feature.desc}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ==================== IMPACT STATS SECTION ==================== */}
      <section className="section" style={{ marginTop: '4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--primary), transparent)' }}></div>
        
        <div className="container">
          <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '4rem' }}>Our <span className="text-gradient-gold">Impact</span></h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '4rem', textAlign: 'center' }}>
            
            {[
              { val: "24/7", label: "Live Monitoring" },
              { val: "99.9%", label: "Uptime SLA" },
              { val: "<100ms", label: "Alert Response" },
              { val: "10+", label: "Sensor Types" }
            ].map((stat, idx) => (
              <div key={idx} style={{ minWidth: '150px' }}>
                <div style={{ fontSize: '4rem', fontWeight: '800', color: '#fff', marginBottom: '0.5rem', textShadow: '0 0 30px rgba(16, 185, 129, 0.4)' }}>{stat.val}</div>
                <div style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '1.2rem', letterSpacing: '2px', textTransform: 'uppercase' }}>{stat.label}</div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="section" style={{ textAlign: 'center', paddingBottom: '8rem', paddingTop: '6rem' }}>
        <div className="container">
          <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto', padding: '5rem 3rem', background: 'linear-gradient(145deg, rgba(20,40,30,0.8) 0%, rgba(10,20,15,0.95) 100%)', border: '1px solid var(--primary)' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Join the <span className="text-gradient">Green Revolution</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.2rem', maxWidth: '650px', margin: '0 auto 3rem auto', lineHeight: '1.8' }}>
              Empowering communities, governments, and organizations to build climate-resilient futures through intelligent data. Start monitoring today.
            </p>
            <button onClick={() => navigate('/signup')} className="btn btn-primary" style={{ padding: '1.2rem 4rem', fontSize: '1.2rem', boxShadow: '0 0 30px var(--primary-glow)' }}>
              Get Started Now
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;