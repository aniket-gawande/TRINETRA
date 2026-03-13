import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Home.css";

/* ============================================
   SVG ICON COMPONENTS
   ============================================ */
const IconSatellite = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 7L9 3L5 7l4 4" /><path d="m17 11 4 4-4 4-4-4" /><path d="m8 12 4 4 6-6" />
    <path d="m16 8 3-3" /><path d="M9 21a6 6 0 0 0-6-6" />
  </svg>
);

const IconMap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);

const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);

const IconAI = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" />
  </svg>
);

const IconWeather = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    <path d="M22 10a3 3 0 0 0-3-3h-2.207a5 5 0 0 0-7.586 0H3" />
  </svg>
);

const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" /><circle cx="12" cy="16" r="1" />
  </svg>
);

const IconGlobe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconData = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
);

const IconLeaf = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const IconRocket = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const IconArrowRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);

/* ============================================
   PLACEHOLDER IMAGE COMPONENTS
   ============================================ */

// Soil Erosion
const SoilErosionImg = () => (
  <div className="placeholder-img" style={{ background: 'linear-gradient(145deg, #1a2e1a, #0f1f12)' }}>
    <svg viewBox="0 0 200 160" fill="none">
      <rect width="200" height="160" fill="#0f1f12" />
      <path d="M0 100 Q40 80 80 95 T160 90 T200 100 V160 H0Z" fill="#2d4a2d" opacity="0.6" />
      <path d="M0 120 Q50 105 100 115 T200 110 V160 H0Z" fill="#3d5a3d" opacity="0.5" />
      <path d="M0 135 Q60 125 120 132 T200 130 V160 H0Z" fill="#4a6a4a" opacity="0.4" />
      <circle cx="40" cy="70" r="3" fill="#6ee7b7" opacity="0.6" />
      <circle cx="80" cy="60" r="2" fill="#6ee7b7" opacity="0.5" />
      <circle cx="130" cy="65" r="4" fill="#6ee7b7" opacity="0.4" />
      <line x1="40" y1="73" x2="40" y2="85" stroke="#6ee7b7" strokeWidth="1" opacity="0.3" />
      <line x1="80" y1="62" x2="80" y2="78" stroke="#6ee7b7" strokeWidth="1" opacity="0.3" />
      <line x1="130" y1="69" x2="130" y2="82" stroke="#6ee7b7" strokeWidth="1" opacity="0.3" />
    </svg>
  </div>
);

// Rainfall
const RainfallImg = () => (
  <div className="placeholder-img" style={{ background: 'linear-gradient(145deg, #0f1f2e, #0a1520)' }}>
    <svg viewBox="0 0 200 160" fill="none">
      <rect width="200" height="160" fill="#0a1520" />
      <ellipse cx="100" cy="50" rx="60" ry="25" fill="#1e3a5f" opacity="0.6" />
      <ellipse cx="70" cy="45" rx="40" ry="20" fill="#1e3a5f" opacity="0.5" />
      <ellipse cx="130" cy="48" rx="35" ry="18" fill="#1e3a5f" opacity="0.5" />
      {[30, 50, 70, 90, 110, 130, 150, 170].map((x, i) => (
        <line key={i} x1={x} y1={75 + (i % 3) * 5} x2={x - 5} y2={95 + (i % 3) * 10} stroke="#60a5fa" strokeWidth="1.5" opacity="0.5" />
      ))}
      {[40, 60, 80, 100, 120, 140, 160].map((x, i) => (
        <line key={i + 10} x1={x} y1={85 + (i % 2) * 8} x2={x - 5} y2={110 + (i % 2) * 12} stroke="#60a5fa" strokeWidth="1" opacity="0.3" />
      ))}
      <path d="M0 140 Q40 130 80 138 T160 135 T200 140 V160 H0Z" fill="#1a3a2a" opacity="0.4" />
    </svg>
  </div>
);

// Low Tech
const LowTechImg = () => (
  <div className="placeholder-img" style={{ background: 'linear-gradient(145deg, #1a1a2e, #0f0f1f)' }}>
    <svg viewBox="0 0 200 160" fill="none">
      <rect width="200" height="160" fill="#0f0f1f" />
      <rect x="60" y="40" width="80" height="60" rx="4" fill="#1a2a3a" stroke="#10b981" strokeWidth="1" opacity="0.6" />
      <rect x="70" y="50" width="25" height="15" rx="2" fill="#10b981" opacity="0.2" />
      <rect x="100" y="50" width="30" height="8" rx="1" fill="#10b981" opacity="0.15" />
      <rect x="100" y="62" width="20" height="5" rx="1" fill="#10b981" opacity="0.1" />
      <line x1="70" y1="75" x2="125" y2="75" stroke="#10b981" strokeWidth="0.5" opacity="0.2" />
      <rect x="70" y="80" width="55" height="10" rx="2" fill="#10b981" opacity="0.1" />
      <circle cx="100" cy="130" r="15" fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.5" />
      <line x1="100" y1="120" x2="100" y2="127" stroke="#f59e0b" strokeWidth="1.5" opacity="0.5" />
      <circle cx="100" cy="133" r="1.5" fill="#f59e0b" opacity="0.5" />
    </svg>
  </div>
);

// Smart Field Mapping
const FieldMappingImg = () => (
  <div className="placeholder-img" style={{ background: 'linear-gradient(145deg, #0f2922, #0a1f18)' }}>
    <svg viewBox="0 0 200 180" fill="none">
      <rect width="200" height="180" fill="#0a1f18" />
      <rect x="20" y="20" width="160" height="140" rx="4" fill="#0f2f22" stroke="#10b981" strokeWidth="0.5" opacity="0.4" />
      {/* Grid lines */}
      {[40, 60, 80, 100, 120, 140, 160].map((x, i) => (
        <line key={`v${i}`} x1={x} y1="20" x2={x} y2="160" stroke="#10b981" strokeWidth="0.3" opacity="0.15" />
      ))}
      {[40, 60, 80, 100, 120, 140].map((y, i) => (
        <line key={`h${i}`} x1="20" y1={y} x2="180" y2={y} stroke="#10b981" strokeWidth="0.3" opacity="0.15" />
      ))}
      {/* Field boundary */}
      <polygon points="40,50 120,35 160,70 150,130 60,140 30,100" fill="#10b981" opacity="0.1" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" />
      {/* GPS points */}
      <circle cx="40" cy="50" r="4" fill="#10b981" opacity="0.8" />
      <circle cx="120" cy="35" r="4" fill="#10b981" opacity="0.8" />
      <circle cx="160" cy="70" r="4" fill="#10b981" opacity="0.8" />
      <circle cx="150" cy="130" r="4" fill="#10b981" opacity="0.8" />
      <circle cx="60" cy="140" r="4" fill="#10b981" opacity="0.8" />
      <circle cx="30" cy="100" r="4" fill="#10b981" opacity="0.8" />
      {/* Rover path */}
      <path d="M50 70 L80 60 L110 75 L130 55 L140 90 L120 110 L90 105 L70 120" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6 3" fill="none" opacity="0.6" />
      <circle cx="70" cy="120" r="5" fill="#f59e0b" opacity="0.7" />
    </svg>
  </div>
);

// Rover Data Collection
const DataCollectionImg = () => (
  <div className="placeholder-img" style={{ background: 'linear-gradient(145deg, #121e2e, #0a1520)' }}>
    <svg viewBox="0 0 200 180" fill="none">
      <rect width="200" height="180" fill="#0a1520" />
      {/* Rover body */}
      <rect x="70" y="70" width="60" height="35" rx="8" fill="#1a3a2a" stroke="#10b981" strokeWidth="1.5" />
      <rect x="80" y="60" width="40" height="15" rx="4" fill="#1a3a2a" stroke="#10b981" strokeWidth="1" />
      <circle cx="85" cy="67" r="3" fill="#10b981" opacity="0.8" />
      <circle cx="100" cy="67" r="2" fill="#f59e0b" opacity="0.6" />
      {/* Wheels */}
      <circle cx="82" cy="110" r="8" fill="#1a2a2a" stroke="#10b981" strokeWidth="1" />
      <circle cx="118" cy="110" r="8" fill="#1a2a2a" stroke="#10b981" strokeWidth="1" />
      <circle cx="82" cy="110" r="3" fill="#10b981" opacity="0.3" />
      <circle cx="118" cy="110" r="3" fill="#10b981" opacity="0.3" />
      {/* Sensor waves */}
      <path d="M100 58 Q100 40 80 30" stroke="#10b981" strokeWidth="1" fill="none" opacity="0.4" strokeDasharray="3 2" />
      <path d="M100 58 Q100 35 120 25" stroke="#10b981" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="3 2" />
      <path d="M100 58 Q100 30 100 15" stroke="#10b981" strokeWidth="1" fill="none" opacity="0.35" strokeDasharray="3 2" />
      {/* Data points */}
      <circle cx="80" cy="30" r="2" fill="#6ee7b7" opacity="0.6" />
      <circle cx="120" cy="25" r="2" fill="#6ee7b7" opacity="0.5" />
      <circle cx="100" cy="15" r="2" fill="#6ee7b7" opacity="0.7" />
      {/* Ground */}
      <path d="M0 130 Q50 125 100 130 T200 128 V180 H0Z" fill="#1a3a2a" opacity="0.3" />
    </svg>
  </div>
);

// AI Dashboard Insights
const AIInsightsImg = () => (
  <div className="placeholder-img" style={{ background: 'linear-gradient(145deg, #0f1a2e, #0a1220)' }}>
    <svg viewBox="0 0 200 180" fill="none">
      <rect width="200" height="180" fill="#0a1220" />
      {/* Dashboard frame */}
      <rect x="15" y="15" width="170" height="150" rx="6" fill="#0f1f2f" stroke="#10b981" strokeWidth="0.5" opacity="0.5" />
      {/* Top bar */}
      <rect x="15" y="15" width="170" height="20" rx="6" fill="#0f2820" opacity="0.5" />
      <circle cx="28" cy="25" r="3" fill="#ef4444" opacity="0.6" />
      <circle cx="38" cy="25" r="3" fill="#f59e0b" opacity="0.6" />
      <circle cx="48" cy="25" r="3" fill="#10b981" opacity="0.6" />
      {/* Chart area */}
      <polyline points="30,120 55,100 80,110 105,80 130,90 155,65 170,75" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.8" />
      <path d="M30 120 L55 100 L80 110 L105 80 L130 90 L155 65 L170 75 V140 H30Z" fill="#10b981" opacity="0.08" />
      {/* Bar chart below */}
      <rect x="30" y="130" width="15" height="20" rx="2" fill="#10b981" opacity="0.3" />
      <rect x="50" y="125" width="15" height="25" rx="2" fill="#10b981" opacity="0.4" />
      <rect x="70" y="128" width="15" height="22" rx="2" fill="#10b981" opacity="0.35" />
      <rect x="90" y="118" width="15" height="32" rx="2" fill="#10b981" opacity="0.5" />
      <rect x="110" y="122" width="15" height="28" rx="2" fill="#10b981" opacity="0.45" />
      <rect x="130" y="115" width="15" height="35" rx="2" fill="#10b981" opacity="0.55" />
      <rect x="150" y="120" width="15" height="30" rx="2" fill="#10b981" opacity="0.4" />
      {/* Sidebar panels */}
      <rect x="25" y="45" width="50" height="25" rx="3" fill="#10b981" opacity="0.1" stroke="#10b981" strokeWidth="0.5" />
      <rect x="80" y="45" width="50" height="25" rx="3" fill="#f59e0b" opacity="0.1" stroke="#f59e0b" strokeWidth="0.5" />
      <rect x="135" y="45" width="40" height="25" rx="3" fill="#60a5fa" opacity="0.1" stroke="#60a5fa" strokeWidth="0.5" />
    </svg>
  </div>
);

// Vision gallery placeholders
const VisionImg1 = () => (
  <div className="placeholder-img" style={{ height: '220px', background: 'linear-gradient(145deg, #0f2922, #1a3a30)' }}>
    <svg viewBox="0 0 200 200" fill="none">
      <rect width="200" height="200" fill="#0f2922" />
      <path d="M0 140 Q30 120 60 130 T120 125 T180 135 T200 130 V200 H0Z" fill="#1a4a3a" opacity="0.5" />
      <path d="M0 160 Q40 150 80 155 T160 150 T200 160 V200 H0Z" fill="#2a5a4a" opacity="0.4" />
      <circle cx="150" cy="40" r="20" fill="#f59e0b" opacity="0.2" />
      <line x1="60" y1="100" x2="60" y2="140" stroke="#10b981" strokeWidth="2" opacity="0.3" />
      <line x1="80" y1="90" x2="80" y2="140" stroke="#10b981" strokeWidth="2" opacity="0.4" />
      <line x1="100" y1="85" x2="100" y2="140" stroke="#10b981" strokeWidth="2" opacity="0.5" />
      <line x1="120" y1="95" x2="120" y2="140" stroke="#10b981" strokeWidth="2" opacity="0.3" />
      <ellipse cx="60" cy="98" rx="8" ry="5" fill="#10b981" opacity="0.3" />
      <ellipse cx="80" cy="88" rx="10" ry="6" fill="#10b981" opacity="0.4" />
      <ellipse cx="100" cy="83" rx="12" ry="7" fill="#10b981" opacity="0.5" />
      <ellipse cx="120" cy="93" rx="9" ry="5" fill="#10b981" opacity="0.3" />
    </svg>
  </div>
);

const VisionImg2 = () => (
  <div className="placeholder-img" style={{ height: '220px', background: 'linear-gradient(145deg, #121e2e, #0a1520)' }}>
    <svg viewBox="0 0 200 200" fill="none">
      <rect width="200" height="200" fill="#0a1520" />
      <circle cx="100" cy="100" r="60" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.3" />
      <circle cx="100" cy="100" r="40" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.4" />
      <circle cx="100" cy="100" r="20" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.5" />
      <circle cx="100" cy="100" r="5" fill="#10b981" opacity="0.8" />
      {/* Data orbiting dots */}
      <circle cx="100" cy="40" r="4" fill="#6ee7b7" opacity="0.6" />
      <circle cx="145" cy="75" r="3" fill="#f59e0b" opacity="0.5" />
      <circle cx="130" cy="140" r="4" fill="#60a5fa" opacity="0.6" />
      <circle cx="60" cy="120" r="3" fill="#6ee7b7" opacity="0.4" />
      <line x1="100" y1="100" x2="100" y2="40" stroke="#10b981" strokeWidth="0.5" opacity="0.3" />
      <line x1="100" y1="100" x2="145" y2="75" stroke="#10b981" strokeWidth="0.5" opacity="0.3" />
    </svg>
  </div>
);

const VisionImg3 = () => (
  <div className="placeholder-img" style={{ height: '220px', background: 'linear-gradient(145deg, #1a1a2e, #0f0f1f)' }}>
    <svg viewBox="0 0 200 200" fill="none">
      <rect width="200" height="200" fill="#0f0f1f" />
      {/* Recycling / sustainability */}
      <path d="M100 50 L130 100 L70 100 Z" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.5" />
      <path d="M100 150 L70 100 L130 100 Z" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.5" />
      <circle cx="100" cy="100" r="30" fill="#10b981" opacity="0.08" />
      <path d="M85 95 Q100 70 115 95" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M115 105 Q100 130 85 105" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.6" />
      <polygon points="115,95 120,90 118,98" fill="#10b981" opacity="0.6" />
      <polygon points="85,105 80,110 82,102" fill="#10b981" opacity="0.6" />
      {/* Leaves */}
      <path d="M50 160 Q60 140 80 150" stroke="#10b981" strokeWidth="1.5" fill="none" opacity="0.3" />
      <path d="M150 40 Q140 55 120 50" stroke="#10b981" strokeWidth="1.5" fill="none" opacity="0.3" />
    </svg>
  </div>
);

const VisionImg4 = () => (
  <div className="placeholder-img" style={{ height: '220px', background: 'linear-gradient(145deg, #0f2922, #0a1f18)' }}>
    <svg viewBox="0 0 200 200" fill="none">
      <rect width="200" height="200" fill="#0a1f18" />
      {/* Robot / future tech */}
      <rect x="75" y="60" width="50" height="40" rx="6" fill="#1a3a2a" stroke="#10b981" strokeWidth="1.5" />
      <circle cx="90" cy="77" r="5" fill="#10b981" opacity="0.6" />
      <circle cx="110" cy="77" r="5" fill="#10b981" opacity="0.6" />
      <rect x="85" y="88" width="30" height="4" rx="2" fill="#10b981" opacity="0.3" />
      {/* Antenna */}
      <line x1="100" y1="60" x2="100" y2="42" stroke="#10b981" strokeWidth="1.5" />
      <circle cx="100" cy="40" r="3" fill="#10b981" opacity="0.7" />
      {/* Signal */}
      <path d="M90 35 Q100 25 110 35" stroke="#10b981" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M83 30 Q100 15 117 30" stroke="#10b981" strokeWidth="1" fill="none" opacity="0.3" />
      {/* Arms */}
      <line x1="75" y1="75" x2="55" y2="85" stroke="#10b981" strokeWidth="1.5" />
      <line x1="125" y1="75" x2="145" y2="85" stroke="#10b981" strokeWidth="1.5" />
      <circle cx="55" cy="85" r="4" fill="#1a3a2a" stroke="#10b981" strokeWidth="1" />
      <circle cx="145" cy="85" r="4" fill="#1a3a2a" stroke="#10b981" strokeWidth="1" />
      {/* Base */}
      <rect x="80" y="100" width="40" height="10" rx="2" fill="#1a3a2a" stroke="#10b981" strokeWidth="1" />
      <rect x="70" y="110" width="60" height="8" rx="3" fill="#1a3a2a" stroke="#10b981" strokeWidth="1" />
      {/* Wheels */}
      <circle cx="80" cy="125" r="6" fill="#1a2a2a" stroke="#10b981" strokeWidth="1" />
      <circle cx="120" cy="125" r="6" fill="#1a2a2a" stroke="#10b981" strokeWidth="1" />
      {/* Ground */}
      <path d="M0 150 Q50 140 100 148 T200 145 V200 H0Z" fill="#1a3a2a" opacity="0.3" />
    </svg>
  </div>
);

/* ============================================
   HOME COMPONENT
   ============================================ */
const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="home-container" style={{ paddingTop: '80px' }}>

      {/* ==================== HERO SECTION ==================== */}
      <section className="hero-section" style={{
        background: `url('/hero-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 2 }}>
          <div className="hero-content">
            <div className="hero-badge">
              <span className="pulse-dot" />
              AI on Wheels for Climate Action
            </div>

            <h1 className="hero-title">
              Precision Agriculture For<br />
              <span className="text-gradient">Sustainable Futures</span>
            </h1>

            <p className="hero-desc">
              Monitor soil health, predict weather impacts, and deploy smart technology with our AI-powered autonomous platform. Build a resilient, future-ready farm.
            </p>

            <div className="hero-buttons">
              <button onClick={() => navigate('/planner')} className="btn-hero-primary">
                Explore Platform
              </button>
              <button onClick={() => navigate('/login')} className="btn-hero-outline">
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT PARYARAK ==================== */}
      <section className="home-section about-section">
        <div className="container">
          <div className="section-header">
            <h2>About PARYARAK</h2>
            <p>
              An AI-powered autonomous rover designed to revolutionize climate monitoring, integrated sensors and AI algorithms to analyze soil health, predict weather impacts, and provide actionable insights for sustainable agriculture.
            </p>
          </div>

          {/* Problem Statement */}
          <h3 className="subsection-title">Problem Statement</h3>
          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-card-img"><SoilErosionImg /></div>
              <div className="problem-card-body">
                <h4>Soil Erosion</h4>
                <p>Degradation of agricultural land, reduction in soil quality, and worsening of weather impacts and technology limitations.</p>
              </div>
            </div>
            <div className="problem-card">
              <div className="problem-card-img"><RainfallImg /></div>
              <div className="problem-card-body">
                <h4>Rainfall</h4>
                <p>Unpredictable precipitation patterns affecting crop yields, leading to food insecurity and economic losses for farmers.</p>
              </div>
            </div>
            <div className="problem-card">
              <div className="problem-card-img"><LowTechImg /></div>
              <div className="problem-card-body">
                <h4>Low Tech Adoption</h4>
                <p>Lack of access to modern tools and technology for soil conservation, weather monitoring, and data-driven agriculture.</p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <h3 className="subsection-title">How It Works</h3>
          <div className="works-grid">
            {/* Arrow connectors */}
            <div className="works-arrow works-arrow-1">→</div>
            <div className="works-arrow works-arrow-2">→</div>
            
            <div className="works-card">
              <div className="works-card-img"><FieldMappingImg /></div>
              <div className="works-card-body">
                <div className="stage-label">Stage 1</div>
                <h4>Smart Field Mapping</h4>
                <p>Monitor soil moisture boundaries and key points for rover/drone navigation.</p>
              </div>
            </div>
            <div className="works-card">
              <div className="works-card-img"><DataCollectionImg /></div>
              <div className="works-card-body">
                <div className="stage-label">Stage 2</div>
                <h4>Precision Data Collection</h4>
                <p>PARYARAK autonomously gathers real-time sensor data across field zones and soil types.</p>
              </div>
            </div>
            <div className="works-card">
              <div className="works-card-img"><AIInsightsImg /></div>
              <div className="works-card-body">
                <div className="stage-label">Stage 3</div>
                <h4>AI-Driven Insights</h4>
                <p>Process raw data and generate AI predictions of soil health, crop data, and farming recommendations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ==================== KEY FEATURES ==================== */}
      <section className="home-section features-section">
        <div className="container">
          <div className="section-header">
            <h2>Key Features</h2>
            <p>Here are some of the main features, benefits, products, and overall features.</p>
          </div>

          <div className="features-grid">
            {[
              { icon: <IconSatellite />, title: 'Real-Time Monitoring', desc: 'Live sensor data from rovers and drones with instant alerts and notifications.' },
              { icon: <IconMap />, title: 'Smart Map Planner', desc: 'Intuitive interface to define rover GPS and waypoint paths for data collection.' },
              { icon: <IconChart />, title: 'Analytics Dashboard', desc: 'Comprehensive data visualization and real-time historical data analysis graphs.' },
              { icon: <IconAI />, title: 'AI Insights', desc: 'Machine learning powered recommendations for sustainable agricultural practices.' },
              { icon: <IconWeather />, title: 'Weather Integration', desc: 'Real-time meteorological data and precipitation forecasting for optimal planning.' },
              { icon: <IconLock />, title: 'Secure Data', desc: 'Firebase authentication with role-based access control, data encryption, and audit logging.' }
            ].map((feature, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ==================== OUR VISION ==================== */}
      <section className="home-section vision-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Vision</h2>
            <p>Building sustainable climatic resilient agricultural ecosystems through cutting-edge AI technology and innovation.</p>
          </div>

          {/* Image Gallery */}
          <div className="vision-gallery">
            <VisionImg1 />
            <VisionImg2 />
            <VisionImg3 />
            <VisionImg4 />
          </div>

          {/* Vision Cards */}
          <div className="vision-cards">
            {[
              { icon: <IconGlobe />, title: 'Global Impact', desc: 'Global impact and supporting farmers worldwide.' },
              { icon: <IconData />, title: 'Data Power', desc: 'Intelligent data-driven decision making.' },
              { icon: <IconLeaf />, title: 'Sustainable Practices', desc: 'Balanced and eco-friendly agricultural practices.' },
              { icon: <IconRocket />, title: 'Future Innovation', desc: 'Advanced robotics and AI-driven solutions.' }
            ].map((item, idx) => (
              <div key={idx} className="vision-card">
                <div className="vision-card-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="home-footer">
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="footer-grid">
            <div className="footer-col">
              <h5>Platform</h5>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>About AI</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Contact</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Data</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Terms & Service</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Solutions</h5>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Solutions</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Base</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>About</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>&nbsp;</h5>
              <ul>
                <li><a href="#" onClick={(e) => e.preventDefault()}>PARYARAK</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>AI Agents</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Precision Agriculture</a></li>
              </ul>
            </div>
            <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h5>Connect</h5>
                <div className="footer-social">
                  <a href="#" onClick={(e) => e.preventDefault()} aria-label="Facebook">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                  </a>
                  <a href="#" onClick={(e) => e.preventDefault()} aria-label="Twitter">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
                  </a>
                  <a href="#" onClick={(e) => e.preventDefault()} aria-label="LinkedIn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                  </a>
                  <a href="#" onClick={(e) => e.preventDefault()} aria-label="GitHub">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3h14.56a14.78 14.78 0 0 1-.01 3c-.76 1.13-2.39 1.72-5.05.97A10.04 10.04 0 0 1 9 19zM12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>
                  </a>
                </div>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <path d="m18 15-6-6-6 6" />
                </svg>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2021-2022 Copyright by ProjectPI. All Rights Reserved.</p>
            <p style={{ color: '#475569' }}>PARYARAK - Precision Agriculture Technology</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;