import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Ensure styles are loaded

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      background: 'rgba(2, 6, 4, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-light)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
        
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* You can replace this emoji with an img tag if you have a logo file */}
          <span style={{ fontSize: '2rem' }}>🌱</span> 
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '1px', color: '#fff' }}>
            TRINETRA
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" className="nav-link" style={{ color: 'var(--text-main)', fontWeight: '500' }}>Home</Link>
          <Link to="/map" className="nav-link" style={{ color: 'var(--text-main)', fontWeight: '500' }}>Map</Link>
          <Link to="/dashboard" className="nav-link" style={{ color: 'var(--text-main)', fontWeight: '500' }}>Dashboard</Link>
          <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;