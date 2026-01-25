import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 👈 Import Auth
import { auth } from "../firebase";
import "../App.css";

const Navbar = () => {
  const { user } = useAuth(); // 👈 Get current user
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      background: 'rgba(2, 6, 4, 0.9)', // slightly darker for readability
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #334155'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px', padding: '0 20px' }}>
        
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <span style={{ fontSize: '2rem' }}>🌱</span> 
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '1px', color: '#fff' }}>
            TRINETRA
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" className="nav-link" style={{ color: '#e2e8f0', fontWeight: '500', textDecoration: 'none' }}>Home</Link>
          
          {/* Only show these if logged in */}
          {user && (
            <>
              <Link to="/planner" className="nav-link" style={{ color: '#e2e8f0', fontWeight: '500', textDecoration: 'none' }}>Map Planner</Link>
              <Link to="/dashboard" className="nav-link" style={{ color: '#e2e8f0', fontWeight: '500', textDecoration: 'none' }}>Dashboard</Link>
            </>
          )}

          {/* Login / Logout Logic */}
          {user ? (
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{user.email}</span>
              <button 
                onClick={handleLogout}
                className="btn" 
                style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem', background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem', background: '#2563eb', color: 'white', borderRadius: '6px', textDecoration: 'none' }}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;