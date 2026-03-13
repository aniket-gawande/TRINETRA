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

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
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

/* ============================================
   PLACEHOLDER SVG IMAGE COMPONENTS
   ============================================ */

// Air Pollution Monitoring
const AirPollutionImg = () => (
  <div className="placeholder-img" style={{ background: 'linear-gradient(145deg, #1a1520, #0f0f1f)' }}>
    <svg viewBox="0 0 200 160" fill="none">
      <rect width="200" height="160" fill="#0f0f1f" />
      {/* City skyline */}
      <rect x="20" y="80" width="20" height="80" fill="#1a2a3a" opacity="0.6" />
      <rect x="45" y="60" width="15" height="100" fill="#1a2a3a" opacity="0.5" />
      <rect x="65" y="70" width="25" height="90" fill="#1a2a3a" opacity="0.6" />
      <rect x="95" y="50" width="18" height="110" fill="#1a2a3a" opacity="0.5" />
      <rect x="118" y="65" width="22" height="95" fill="#1a2a3a" opacity="0.6" />
      <rect x="145" y="75" width="20" height="85" fill="#1a2a3a" opacity="0.5" />
      <rect x="170" y="85" width="15" height="75" fill="#1a2a3a" opacity="0.4" />
      {/* Smog/pollution clouds */}
      <ellipse cx="60" cy="55" rx="40" ry="15" fill="#ef4444" opacity="0.12" />
      <ellipse cx="120" cy="45" rx="50" ry="18" fill="#ef4444" opacity="0.1" />
      <ellipse cx="90" cy="35" rx="35" ry="12" fill="#ef4444" opacity="0.08" />
      {/* AQI meter */}
      <rect x="140" y="20" width="40" height="25" rx="4" fill="#1a2a3a" stroke="#ef4444" strokeWidth="1" opacity="0.8" />
      <text x="148" y="36" fontSize="9" fill="#ef4444" opacity="0.9">AQI</text>
      <circle cx="175" cy="32" r="6" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.7" />
      {/* Particles */}
      {[30, 50, 70, 100, 130, 150].map((x, i) => (
        <circle key={i} cx={x} cy={25 + (i % 3) * 10} r={1.5 + (i % 2)} fill="#ef4444" opacity={0.3 + (i % 3) * 0.1} />
      ))}
    </svg>
  </div>
);

// Wildfire / Smoke Detection
const WildfireImg = () => (
  <div className="placeholder-img" style={{ background: 'linear-gradient(145deg, #1f1510, #0f0a05)' }}>
    <svg viewBox="0 0 200 160" fill="none">
      <rect width="200" height="160" fill="#0f0a05" />
      {/* Forest trees */}
      {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((x, i) => (
        <React.Fragment key={i}>
          <polygon points={`${x},${100 - (i % 3) * 10} ${x - 10},${130} ${x + 10},${130}`} fill="#1a3a1a" opacity={0.5 + (i % 3) * 0.1} />
          <line x1={x} y1="130" x2={x} y2="145" stroke="#2d4a2d" strokeWidth="2" opacity="0.4" />
        </React.Fragment>
      ))}
      {/* Fire */}
      <path d="M85 110 Q90 85 95 95 Q100 75 110 95 Q115 80 120 110 Z" fill="#f97316" opacity="0.6" />
      <path d="M90 115 Q95 95 100 100 Q105 88 110 115 Z" fill="#ef4444" opacity="0.5" />
      <path d="M95 118 Q100 105 105 118 Z" fill="#fbbf24" opacity="0.4" />
      {/* Smoke */}
      <ellipse cx="100" cy="65" rx="25" ry="12" fill="#64748b" opacity="0.15" />
      <ellipse cx="95" cy="50" rx="18" ry="8" fill="#64748b" opacity="0.1" />
      <ellipse cx="105" cy="38" rx="12" ry="6" fill="#64748b" opacity="0.08" />
      {/* Ground */}
      <path d="M0 140 Q50 132 100 138 T200 135 V160 H0Z" fill="#1a2a1a" opacity="0.4" />
      {/* 30% label */}
      <text x="20" y="30" fontSize="11" fill="#f97316" fontWeight="bold" opacity="0.7">30% CO₂</text>
    </svg>
  </div>
);

// Flood / Water Logging
const FloodImg = () => (
  <div className="placeholder-img" style={{ background: 'linear-gradient(145deg, #0f1f2e, #0a1520)' }}>
    <svg viewBox="0 0 200 160" fill="none">
      <rect width="200" height="160" fill="#0a1520" />
      {/* Buildings partially submerged */}
      <rect x="30" y="40" width="25" height="120" fill="#1a2a3a" opacity="0.6" />
      <rect x="60" y="55" width="20" height="105" fill="#1a2a3a" opacity="0.5" />
      <rect x="100" y="35" width="30" height="125" fill="#1a2a3a" opacity="0.6" />
      <rect x="140" y="50" width="22" height="110" fill="#1a2a3a" opacity="0.5" />
      <rect x="170" y="60" width="18" height="100" fill="#1a2a3a" opacity="0.4" />
      {/* Water level */}
      <path d="M0 100 Q20 95 40 100 T80 98 T120 100 T160 97 T200 100 V160 H0Z" fill="#3b82f6" opacity="0.25" />
      <path d="M0 110 Q30 105 60 110 T120 108 T180 110 T200 108 V160 H0Z" fill="#3b82f6" opacity="0.2" />
      <path d="M0 120 Q25 115 50 120 T100 118 T150 120 T200 118 V160 H0Z" fill="#3b82f6" opacity="0.15" />
      {/* Rain */}
      {[25, 45, 65, 85, 105, 125, 145, 165, 185].map((x, i) => (
        <line key={i} x1={x} y1={15 + (i % 3) * 5} x2={x - 3} y2={30 + (i % 3) * 8} stroke="#60a5fa" strokeWidth="1.2" opacity="0.4" />
      ))}
      {/* Clouds */}
      <ellipse cx="80" cy="18" rx="45" ry="14" fill="#1e3a5f" opacity="0.4" />
      <ellipse cx="140" cy="22" rx="35" ry="12" fill="#1e3a5f" opacity="0.3" />
      {/* GPS pin */}
      <circle cx="160" cy="80" r="5" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.7" />
      <circle cx="160" cy="80" r="2" fill="#3b82f6" opacity="0.7" />
    </svg>
  </div>
);

// Micro-Climate Data
const MicroClimateImg = () => (
  <div className="placeholder-img" style={{ background: 'linear-gradient(145deg, #0f2922, #0a1f18)' }}>
    <svg viewBox="0 0 200 160" fill="none">
      <rect width="200" height="160" fill="#0a1f18" />
      {/* Grid/map */}
      <rect x="20" y="20" width="160" height="120" rx="4" fill="#0f2f22" stroke="#10b981" strokeWidth="0.5" opacity="0.4" />
      {[40, 60, 80, 100, 120, 140, 160].map((x, i) => (
        <line key={`v${i}`} x1={x} y1="20" x2={x} y2="140" stroke="#10b981" strokeWidth="0.3" opacity="0.12" />
      ))}
      {[40, 60, 80, 100, 120].map((y, i) => (
        <line key={`h${i}`} x1="20" y1={y} x2="180" y2={y} stroke="#10b981" strokeWidth="0.3" opacity="0.12" />
      ))}
      {/* Heat zones */}
      <circle cx="60" cy="60" r="18" fill="#ef4444" opacity="0.08" />
      <circle cx="60" cy="60" r="10" fill="#ef4444" opacity="0.12" />
      <circle cx="130" cy="90" r="22" fill="#3b82f6" opacity="0.08" />
      <circle cx="130" cy="90" r="12" fill="#3b82f6" opacity="0.12" />
      <circle cx="100" cy="50" r="15" fill="#f59e0b" opacity="0.08" />
      <circle cx="100" cy="50" r="8" fill="#f59e0b" opacity="0.12" />
      {/* Sensor nodes */}
      <circle cx="60" cy="60" r="3" fill="#10b981" opacity="0.8" />
      <circle cx="130" cy="90" r="3" fill="#10b981" opacity="0.8" />
      <circle cx="100" cy="50" r="3" fill="#10b981" opacity="0.8" />
      <circle cx="150" cy="45" r="3" fill="#10b981" opacity="0.8" />
      <circle cx="50" cy="110" r="3" fill="#10b981" opacity="0.8" />
      {/* Labels */}
      <text x="48" y="55" fontSize="7" fill="#ef4444" opacity="0.7">32°C</text>
      <text x="118" y="85" fontSize="7" fill="#3b82f6" opacity="0.7">78% RH</text>
      <text x="90" y="45" fontSize="7" fill="#f59e0b" opacity="0.7">CO₂</text>
    </svg>
  </div>
);

// Stage 1: Data Collection
const DataCollectionImg = () => (
  <div className="placeholder-img" style={{ background: 'linear-gradient(145deg, #121e2e, #0a1520)' }}>
    <svg viewBox="0 0 200 180" fill="none">
      <rect width="200" height="180" fill="#0a1520" />
      {/* Rover body */}
      <rect x="60" y="65" width="80" height="40" rx="10" fill="#1a3a2a" stroke="#10b981" strokeWidth="1.5" />
      <rect x="75" y="52" width="50" height="18" rx="5" fill="#1a3a2a" stroke="#10b981" strokeWidth="1" />
      {/* Camera */}
      <circle cx="90" cy="61" r="4" fill="#10b981" opacity="0.8" />
      <circle cx="108" cy="61" r="3" fill="#f59e0b" opacity="0.6" />
      {/* Antenna */}
      <line x1="100" y1="52" x2="100" y2="32" stroke="#10b981" strokeWidth="1.5" />
      <circle cx="100" cy="30" r="3" fill="#10b981" opacity="0.8" />
      {/* Sensor waves */}
      <path d="M88 25 Q100 12 112 25" stroke="#10b981" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M82 18 Q100 3 118 18" stroke="#10b981" strokeWidth="1" fill="none" opacity="0.3" />
      {/* Sensors on body */}
      <text x="68" y="90" fontSize="8" fill="#10b981" opacity="0.7">🌡️</text>
      <text x="88" y="90" fontSize="8" fill="#10b981" opacity="0.7">💨</text>
      <text x="108" y="90" fontSize="8" fill="#10b981" opacity="0.7">🌱</text>
      <text x="128" y="90" fontSize="8" fill="#10b981" opacity="0.7">📷</text>
      {/* Wheels */}
      <circle cx="78" cy="112" r="10" fill="#1a2a2a" stroke="#10b981" strokeWidth="1.5" />
      <circle cx="122" cy="112" r="10" fill="#1a2a2a" stroke="#10b981" strokeWidth="1.5" />
      <circle cx="78" cy="112" r="4" fill="#10b981" opacity="0.2" />
      <circle cx="122" cy="112" r="4" fill="#10b981" opacity="0.2" />
      {/* Ground */}
      <path d="M0 130 Q50 125 100 130 T200 128 V180 H0Z" fill="#1a3a2a" opacity="0.3" />
      {/* Data points floating */}
      <circle cx="50" cy="40" r="2" fill="#6ee7b7" opacity="0.5" />
      <circle cx="150" cy="35" r="2" fill="#6ee7b7" opacity="0.5" />
      <circle cx="160" cy="55" r="2" fill="#f59e0b" opacity="0.4" />
    </svg>
  </div>
);

// Stage 2: AI Processing
const AIProcessingImg = () => (
  <div className="placeholder-img" style={{ background: 'linear-gradient(145deg, #1a1a2e, #0f0f1f)' }}>
    <svg viewBox="0 0 200 180" fill="none">
      <rect width="200" height="180" fill="#0f0f1f" />
      {/* CPU chip */}
      <rect x="60" y="50" width="80" height="80" rx="8" fill="#1a2a3a" stroke="#f59e0b" strokeWidth="1.5" />
      <rect x="75" y="65" width="50" height="50" rx="4" fill="#0f1f2f" stroke="#f59e0b" strokeWidth="1" />
      {/* Circuit traces */}
      {[45, 55, 65, 75].map((y, i) => (
        <line key={`l${i}`} x1="40" y1={y + 20} x2="60" y2={y + 20} stroke="#f59e0b" strokeWidth="1" opacity="0.4" />
      ))}
      {[45, 55, 65, 75].map((y, i) => (
        <line key={`r${i}`} x1="140" y1={y + 20} x2="160" y2={y + 20} stroke="#f59e0b" strokeWidth="1" opacity="0.4" />
      ))}
      {[75, 95, 115].map((x, i) => (
        <line key={`t${i}`} x1={x} y1="35" x2={x} y2="50" stroke="#f59e0b" strokeWidth="1" opacity="0.4" />
      ))}
      {[75, 95, 115].map((x, i) => (
        <line key={`b${i}`} x1={x} y1="130" x2={x} y2="145" stroke="#f59e0b" strokeWidth="1" opacity="0.4" />
      ))}
      {/* AI text */}
      <text x="88" y="95" fontSize="14" fill="#f59e0b" fontWeight="bold" opacity="0.8">AI</text>
      {/* Neural network nodes */}
      <circle cx="85" cy="75" r="3" fill="#f59e0b" opacity="0.4" />
      <circle cx="115" cy="75" r="3" fill="#f59e0b" opacity="0.4" />
      <circle cx="85" cy="110" r="3" fill="#f59e0b" opacity="0.4" />
      <circle cx="115" cy="110" r="3" fill="#f59e0b" opacity="0.4" />
      <line x1="85" y1="75" x2="115" y2="110" stroke="#f59e0b" strokeWidth="0.5" opacity="0.3" />
      <line x1="115" y1="75" x2="85" y2="110" stroke="#f59e0b" strokeWidth="0.5" opacity="0.3" />
      {/* Data flowing in */}
      <text x="15" y="70" fontSize="7" fill="#10b981" opacity="0.6">Sensor</text>
      <text x="15" y="85" fontSize="7" fill="#10b981" opacity="0.6">Data →</text>
      <text x="162" y="70" fontSize="7" fill="#ef4444" opacity="0.6">← Alert</text>
      <text x="162" y="85" fontSize="7" fill="#3b82f6" opacity="0.6">← Insight</text>
    </svg>
  </div>
);

// Stage 3: Real-Time Alerts
const AlertsImg = () => (
  <div className="placeholder-img" style={{ background: 'linear-gradient(145deg, #1f1015, #150a0d)' }}>
    <svg viewBox="0 0 200 180" fill="none">
      <rect width="200" height="180" fill="#150a0d" />
      {/* Phone outline */}
      <rect x="65" y="25" width="70" height="130" rx="10" fill="#1a1a2a" stroke="#ef4444" strokeWidth="1" opacity="0.7" />
      <rect x="72" y="45" width="56" height="90" rx="2" fill="#0f0f1f" />
      {/* Alert notifications */}
      <rect x="77" y="50" width="46" height="20" rx="4" fill="#ef4444" opacity="0.15" stroke="#ef4444" strokeWidth="0.5" />
      <text x="80" y="62" fontSize="6" fill="#ef4444" opacity="0.8">🔥 Fire Alert!</text>
      <rect x="77" y="75" width="46" height="20" rx="4" fill="#f97316" opacity="0.12" stroke="#f97316" strokeWidth="0.5" />
      <text x="80" y="87" fontSize="6" fill="#f97316" opacity="0.8">💨 AQI: 250</text>
      <rect x="77" y="100" width="46" height="20" rx="4" fill="#3b82f6" opacity="0.12" stroke="#3b82f6" strokeWidth="0.5" />
      <text x="80" y="112" fontSize="6" fill="#3b82f6" opacity="0.8">🌊 Flood Risk</text>
      {/* Bell icon */}
      <circle cx="100" cy="35" r="5" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.6" />
      <line x1="100" y1="32" x2="100" y2="36" stroke="#ef4444" strokeWidth="1" opacity="0.6" />
      {/* Alert waves */}
      <path d="M45 60 Q35 60 30 50" stroke="#ef4444" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M45 70 Q30 70 22 55" stroke="#ef4444" strokeWidth="1" fill="none" opacity="0.2" />
      <path d="M155 60 Q165 60 170 50" stroke="#ef4444" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M155 70 Q170 70 178 55" stroke="#ef4444" strokeWidth="1" fill="none" opacity="0.2" />
    </svg>
  </div>
);

// Stage 4: Cloud Sync
const CloudSyncImg = () => (
  <div className="placeholder-img" style={{ background: 'linear-gradient(145deg, #101828, #0a1220)' }}>
    <svg viewBox="0 0 200 180" fill="none">
      <rect width="200" height="180" fill="#0a1220" />
      {/* Cloud */}
      <path d="M60 80 Q60 55 85 55 Q90 40 110 40 Q135 40 140 60 Q160 60 160 80 Q160 100 140 100 L60 100 Q40 100 40 80 Z" fill="#1e3a5f" opacity="0.3" stroke="#3b82f6" strokeWidth="1" />
      {/* Upload arrows */}
      <line x1="80" y1="140" x2="80" y2="105" stroke="#10b981" strokeWidth="1.5" opacity="0.5" />
      <polygon points="80,105 75,112 85,112" fill="#10b981" opacity="0.5" />
      <line x1="120" y1="140" x2="120" y2="105" stroke="#10b981" strokeWidth="1.5" opacity="0.5" />
      <polygon points="120,105 115,112 125,112" fill="#10b981" opacity="0.5" />
      {/* SD card at bottom */}
      <rect x="60" y="140" width="30" height="22" rx="3" fill="#1a2a3a" stroke="#f59e0b" strokeWidth="1" />
      <text x="66" y="154" fontSize="7" fill="#f59e0b" opacity="0.8">SD</text>
      {/* WiFi symbol */}
      <rect x="110" y="140" width="30" height="22" rx="3" fill="#1a2a3a" stroke="#10b981" strokeWidth="1" />
      <text x="116" y="154" fontSize="7" fill="#10b981" opacity="0.8">WiFi</text>
      {/* Database icons in cloud */}
      <rect x="80" y="65" width="15" height="12" rx="2" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="0.5" />
      <rect x="105" y="65" width="15" height="12" rx="2" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="0.5" />
      <text x="82" y="74" fontSize="6" fill="#3b82f6" opacity="0.7">DB</text>
      <text x="107" y="74" fontSize="6" fill="#3b82f6" opacity="0.7">FB</text>
    </svg>
  </div>
);

// Stage 5: Visualization Dashboard
const DashboardImg = () => (
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
      <polyline points="30,100 55,85 80,92 105,70 130,78 155,55 170,65" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.8" />
      <path d="M30 100 L55 85 L80 92 L105 70 L130 78 L155 55 L170 65 V120 H30Z" fill="#10b981" opacity="0.06" />
      {/* Stat cards */}
      <rect x="25" y="45" width="45" height="22" rx="3" fill="#10b981" opacity="0.08" stroke="#10b981" strokeWidth="0.5" />
      <text x="30" y="55" fontSize="5" fill="#10b981" opacity="0.7">AQI</text>
      <text x="30" y="63" fontSize="8" fill="#10b981" opacity="0.9">42</text>
      <rect x="77" y="45" width="45" height="22" rx="3" fill="#f59e0b" opacity="0.08" stroke="#f59e0b" strokeWidth="0.5" />
      <text x="82" y="55" fontSize="5" fill="#f59e0b" opacity="0.7">TEMP</text>
      <text x="82" y="63" fontSize="8" fill="#f59e0b" opacity="0.9">28°C</text>
      <rect x="129" y="45" width="48" height="22" rx="3" fill="#3b82f6" opacity="0.08" stroke="#3b82f6" strokeWidth="0.5" />
      <text x="134" y="55" fontSize="5" fill="#3b82f6" opacity="0.7">SOIL</text>
      <text x="134" y="63" fontSize="8" fill="#3b82f6" opacity="0.9">65%</text>
      {/* Bar chart */}
      <rect x="30" y="125" width="12" height="22" rx="2" fill="#10b981" opacity="0.3" />
      <rect x="47" y="120" width="12" height="27" rx="2" fill="#10b981" opacity="0.4" />
      <rect x="64" y="123" width="12" height="24" rx="2" fill="#10b981" opacity="0.35" />
      <rect x="81" y="115" width="12" height="32" rx="2" fill="#10b981" opacity="0.5" />
      <rect x="98" y="118" width="12" height="29" rx="2" fill="#10b981" opacity="0.45" />
      <rect x="115" y="112" width="12" height="35" rx="2" fill="#10b981" opacity="0.55" />
      <rect x="132" y="117" width="12" height="30" rx="2" fill="#10b981" opacity="0.4" />
      <rect x="149" y="120" width="12" height="27" rx="2" fill="#10b981" opacity="0.35" />
    </svg>
  </div>
);

// Vision gallery SVGs
const VisionImg1 = () => (
  <div className="placeholder-img" style={{ height: '220px', background: 'linear-gradient(145deg, #0f2922, #1a3a30)' }}>
    <svg viewBox="0 0 200 200" fill="none">
      <rect width="200" height="200" fill="#0f2922" />
      <path d="M0 140 Q30 120 60 130 T120 125 T180 135 T200 130 V200 H0Z" fill="#1a4a3a" opacity="0.5" />
      <path d="M0 160 Q40 150 80 155 T160 150 T200 160 V200 H0Z" fill="#2a5a4a" opacity="0.4" />
      <circle cx="150" cy="40" r="20" fill="#f59e0b" opacity="0.2" />
      {/* Sensor nodes on field */}
      {[40, 80, 120, 160].map((x, i) => (
        <React.Fragment key={i}>
          <line x1={x} y1={115 - i * 5} x2={x} y2={140} stroke="#10b981" strokeWidth="2" opacity="0.4" />
          <circle cx={x} cy={113 - i * 5} r="4" fill="#10b981" opacity="0.5" />
        </React.Fragment>
      ))}
      <text x="30" y="185" fontSize="9" fill="#10b981" opacity="0.5">Smart Field Monitoring</text>
    </svg>
  </div>
);

const VisionImg2 = () => (
  <div className="placeholder-img" style={{ height: '220px', background: 'linear-gradient(145deg, #121e2e, #0a1520)' }}>
    <svg viewBox="0 0 200 200" fill="none">
      <rect width="200" height="200" fill="#0a1520" />
      {/* Concentric data rings */}
      <circle cx="100" cy="100" r="60" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.3" />
      <circle cx="100" cy="100" r="40" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.4" />
      <circle cx="100" cy="100" r="20" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.5" />
      <circle cx="100" cy="100" r="5" fill="#10b981" opacity="0.8" />
      <circle cx="100" cy="40" r="4" fill="#6ee7b7" opacity="0.6" />
      <circle cx="145" cy="75" r="3" fill="#f59e0b" opacity="0.5" />
      <circle cx="130" cy="140" r="4" fill="#60a5fa" opacity="0.6" />
      <circle cx="60" cy="120" r="3" fill="#6ee7b7" opacity="0.4" />
      <line x1="100" y1="100" x2="100" y2="40" stroke="#10b981" strokeWidth="0.5" opacity="0.3" />
      <line x1="100" y1="100" x2="145" y2="75" stroke="#10b981" strokeWidth="0.5" opacity="0.3" />
      <text x="55" y="185" fontSize="9" fill="#10b981" opacity="0.5">IoT Data Network</text>
    </svg>
  </div>
);

const VisionImg3 = () => (
  <div className="placeholder-img" style={{ height: '220px', background: 'linear-gradient(145deg, #1a1a2e, #0f0f1f)' }}>
    <svg viewBox="0 0 200 200" fill="none">
      <rect width="200" height="200" fill="#0f0f1f" />
      {/* Sustainability symbol */}
      <path d="M100 50 L130 100 L70 100 Z" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.5" />
      <path d="M100 150 L70 100 L130 100 Z" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.5" />
      <circle cx="100" cy="100" r="30" fill="#10b981" opacity="0.06" />
      <path d="M85 95 Q100 70 115 95" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M115 105 Q100 130 85 105" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.6" />
      <polygon points="115,95 120,90 118,98" fill="#10b981" opacity="0.6" />
      <polygon points="85,105 80,110 82,102" fill="#10b981" opacity="0.6" />
      <text x="42" y="185" fontSize="9" fill="#10b981" opacity="0.5">Sustainable Agriculture</text>
    </svg>
  </div>
);

const VisionImg4 = () => (
  <div className="placeholder-img" style={{ height: '220px', background: 'linear-gradient(145deg, #0f2922, #0a1f18)' }}>
    <svg viewBox="0 0 200 200" fill="none">
      <rect width="200" height="200" fill="#0a1f18" />
      {/* Rover + AI */}
      <rect x="75" y="70" width="50" height="30" rx="6" fill="#1a3a2a" stroke="#10b981" strokeWidth="1.5" />
      <circle cx="90" cy="82" r="4" fill="#10b981" opacity="0.6" />
      <circle cx="110" cy="82" r="4" fill="#10b981" opacity="0.6" />
      <rect x="85" y="90" width="30" height="3" rx="1.5" fill="#10b981" opacity="0.3" />
      <line x1="100" y1="70" x2="100" y2="52" stroke="#10b981" strokeWidth="1.5" />
      <circle cx="100" cy="50" r="3" fill="#10b981" opacity="0.7" />
      <path d="M90 45 Q100 35 110 45" stroke="#10b981" strokeWidth="1" fill="none" opacity="0.4" />
      <path d="M83 40 Q100 28 117 40" stroke="#10b981" strokeWidth="1" fill="none" opacity="0.3" />
      {/* Wheels */}
      <circle cx="85" cy="108" r="6" fill="#1a2a2a" stroke="#10b981" strokeWidth="1" />
      <circle cx="115" cy="108" r="6" fill="#1a2a2a" stroke="#10b981" strokeWidth="1" />
      <path d="M0 130 Q50 122 100 128 T200 125 V200 H0Z" fill="#1a3a2a" opacity="0.3" />
      <text x="48" y="185" fontSize="9" fill="#10b981" opacity="0.5">Autonomous Rover AI</text>
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
              AI-Powered Climate Intelligence on Wheels
            </div>

            <h1 className="hero-title">
              Real-Time Climate<br />
              Monitoring For<br />
              <span className="text-gradient">Sustainable Futures</span>
            </h1>

            <p className="hero-desc">
              Monitor air quality, detect wildfires & floods, collect micro-climate data, and deploy smart IoT technology with our AI-powered autonomous rover. Build a resilient, data-driven future.
            </p>

            <div className="hero-buttons">
              <button onClick={() => navigate('/planner')} className="btn-hero-primary">
                Explore Platform
              </button>
              <button onClick={() => navigate('/dashboard')} className="btn-hero-outline">
                View Data
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT TRINETRA ==================== */}
      <section className="home-section about-section">
        <div className="container">
          <div className="section-header">
            <h2>About TRINETRA</h2>
            <p>
              An AI-powered autonomous rover designed to solve the urgent climate challenge. Despite rapid technological progress, climate impact tracking on the ground is broken — weather apps give broad forecasts, satellites provide delayed snapshots, and scattered sensors lack accuracy. TRINETRA bridges this gap with real-time, hyper-local environmental intelligence.
            </p>
          </div>

          {/* Problem Statement */}
          <h3 className="subsection-title">The Climate Challenge</h3>
          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-card-img"><AirPollutionImg /></div>
              <div className="problem-card-body">
                <h4>Air Pollution Monitoring</h4>
                <p>Major Indian cities cross AQI &gt; 200 regularly. Current stations are stationary &amp; costly (~₹10–15 lakh each), leaving citizens without street-level exposure data.</p>
              </div>
            </div>
            <div className="problem-card">
              <div className="problem-card-img"><WildfireImg /></div>
              <div className="problem-card-body">
                <h4>Wildfire / Smoke Detection</h4>
                <p>Forest fires release 30% of global carbon emissions. Satellites detect them hours too late. No affordable real-time ground-level smoke detection exists.</p>
              </div>
            </div>
            <div className="problem-card">
              <div className="problem-card-img"><FloodImg /></div>
              <div className="problem-card-body">
                <h4>Flood / Water Logging</h4>
                <p>Urban flooding in Bengaluru, Mumbai, Chennai causes ₹Crores in damage. Current systems depend on delayed satellite data or manual reporting with no real-time local monitoring.</p>
              </div>
            </div>
            <div className="problem-card">
              <div className="problem-card-img"><MicroClimateImg /></div>
              <div className="problem-card-body">
                <h4>Micro-Climate Data Gaps</h4>
                <p>Weather stations collect broad regional data while local variations in temperature, humidity, and CO₂ go undetected. No affordable system exists for continuous neighborhood monitoring.</p>
              </div>
            </div>
          </div>

          {/* How It Works / Methodology */}
          <h3 className="subsection-title">Methodology — How It Works</h3>
          <div className="works-grid">
            {/* Arrow connectors */}
            <div className="works-arrow works-arrow-1">→</div>
            <div className="works-arrow works-arrow-2">→</div>
            <div className="works-arrow works-arrow-3">→</div>
            <div className="works-arrow works-arrow-4">→</div>

            <div className="works-card">
              <div className="works-card-img"><DataCollectionImg /></div>
              <div className="works-card-body">
                <div className="stage-label">Stage 1</div>
                <h4>Data Collection</h4>
                <p>Sensors + camera collect environmental readings as the TRINETRA rover traverses the field or city.</p>
              </div>
            </div>
            <div className="works-card">
              <div className="works-card-img"><AIProcessingImg /></div>
              <div className="works-card-body">
                <div className="stage-label">Stage 2</div>
                <h4>AI Processing</h4>
                <p>On-device ESP-32 processes sensor data. PC-side AI analyzes crop images and detects pollution anomalies.</p>
              </div>
            </div>
            <div className="works-card">
              <div className="works-card-img"><AlertsImg /></div>
              <div className="works-card-body">
                <div className="stage-label">Stage 3</div>
                <h4>Real-Time Alerts</h4>
                <p>Instant notifications when pollution spikes, fire/smoke detected, or flood risk is identified in the area.</p>
              </div>
            </div>
            <div className="works-card">
              <div className="works-card-img"><CloudSyncImg /></div>
              <div className="works-card-body">
                <div className="stage-label">Stage 4</div>
                <h4>Cloud Sync</h4>
                <p>Data uploaded to MongoDB via WiFi. Offline records stored on SD card and auto bulk-synced on reconnect.</p>
              </div>
            </div>
            <div className="works-card">
              <div className="works-card-img"><DashboardImg /></div>
              <div className="works-card-body">
                <div className="stage-label">Stage 5</div>
                <h4>Visualization</h4>
                <p>Web dashboard with real-time charts, live maps, historical analytics, and AI-powered recommendations.</p>
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
            <p>A complete suite of tools for real-time environmental monitoring, analysis, and climate-resilient decision making.</p>
          </div>

          <div className="features-grid">
            {[
              { icon: <IconSatellite />, title: 'Real-Time Monitoring', desc: 'Live sensor data from the IoT rover with instant alerts when AQI, temperature, or flood thresholds are crossed.' },
              { icon: <IconMap />, title: 'Smart Map Planner', desc: 'Define GPS waypoints and autonomous navigation paths for comprehensive field or urban area coverage.' },
              { icon: <IconChart />, title: 'Analytics Dashboard', desc: 'Interactive charts, historical trends, and daily aggregate statistics with PDF & CSV export options.' },
              { icon: <IconAI />, title: 'AI Insights', desc: 'Machine learning-powered crop disease detection, air quality analysis, and actionable environmental recommendations.' },
              { icon: <IconWeather />, title: 'Offline Resilience', desc: 'ESP-32 SD card storage ensures zero data loss when out of WiFi range. Auto bulk-sync happens on reconnect.' },
              { icon: <IconShield />, title: 'Secure Data', desc: 'Firebase authentication with role-based access control. API key security for ESP-32 IoT device communication.' }
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
            <p>Building sustainable climate-resilient ecosystems through cutting-edge AI technology, IoT sensors, and real-time data intelligence.</p>
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
              { icon: <IconGlobe />, title: 'Global Impact', desc: 'Real-time climate monitoring supporting communities worldwide.' },
              { icon: <IconData />, title: 'Data Power', desc: 'Hyper-local data-driven decision making for informed action.' },
              { icon: <IconLeaf />, title: 'Sustainable Practices', desc: 'Eco-friendly monitoring with zero environmental footprint.' },
              { icon: <IconRocket />, title: 'Future Innovation', desc: 'Advanced ESP-32 IoT robotics and AI-driven solutions.' }
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
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>Dashboard</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/planner'); }}>Map Planner</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); }}>Analytics</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); }}>Alerts</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Solutions</h5>
              <ul>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Air Quality</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Wildfire Detection</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Flood Monitoring</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Micro-Climate</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>&nbsp;</h5>
              <ul>
                <li><a href="#" onClick={(e) => e.preventDefault()}>TRINETRA</a></li>
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
            <p>© 2025 TRINETRA — AI-Powered Climate Intelligence Platform</p>
            <p style={{ color: '#475569' }}>Built with ESP-32 · MongoDB · React · AI</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;