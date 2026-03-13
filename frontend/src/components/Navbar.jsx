import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import "../App.css";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  const navLinkStyle = {
    color: "#e2e8f0",
    fontWeight: "500",
    textDecoration: "none",
    fontSize: "0.95rem",
    transition: "color 0.3s ease",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  };

  const dropdownStyle = {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)",
    minWidth: "200px",
    background: "rgba(10, 15, 26, 0.98)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "10px",
    padding: "0.5rem 0",
    backdropFilter: "blur(12px)",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.5)",
    zIndex: 100,
  };

  const dropdownLinkStyle = {
    display: "block",
    padding: "0.6rem 1.2rem",
    color: "#94a3b8",
    fontSize: "0.9rem",
    textDecoration: "none",
    transition: "all 0.2s ease",
  };

  const ChevronDown = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );

  return (
    <>
      <style>{`
        .nav-dropdown-menu { opacity: 0; visibility: hidden; transition: all 0.25s ease; pointer-events: none; }
        .nav-dropdown:hover .nav-dropdown-menu { opacity: 1; visibility: visible; pointer-events: auto; }
        .nav-dropdown-menu a:hover { background: rgba(16, 185, 129, 0.1); color: #10b981 !important; }
        @media (min-width: 769px) { .desktop-nav { display: flex !important; } }
        @media (max-width: 768px) { .mobile-toggle { display: flex !important; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 999 }}
          onClick={closeMenu}
        />
      )}

      {/* Navigation Bar */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        background: "rgba(5, 8, 15, 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "72px",
          padding: "0 2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}>
          {/* Logo */}
          <Link to="/" onClick={closeMenu} style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            flexShrink: 0,
          }}>
            <span style={{ fontSize: "1.4rem" }}>🚜</span>
            <span style={{
              fontSize: "1.25rem",
              fontWeight: "800",
              color: "#e2e8f0",
              letterSpacing: "-0.01em",
            }}>
              TRINETRA
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="desktop-nav" style={{
            display: "none",
            gap: "1.8rem",
            alignItems: "center",
          }}>
            {/* Platform Dropdown */}
            <div className="nav-dropdown" style={{ position: "relative" }}>
              <Link to="/planner" style={navLinkStyle} onClick={closeMenu}
                onMouseEnter={(e) => e.currentTarget.style.color = "#10b981"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#e2e8f0"}
              >
                Platform <ChevronDown />
              </Link>
              <div className="nav-dropdown-menu" style={dropdownStyle}>
                <Link to="/" style={dropdownLinkStyle} onClick={closeMenu}>Overview</Link>
                <Link to="/planner" style={dropdownLinkStyle} onClick={closeMenu}>Map Planner</Link>
                <Link to="/dashboard" style={dropdownLinkStyle} onClick={closeMenu}>Dashboard</Link>
              </div>
            </div>

            {/* Solutions Dropdown */}
            <div className="nav-dropdown" style={{ position: "relative" }}>
              <Link to="/dashboard" style={navLinkStyle} onClick={closeMenu}
                onMouseEnter={(e) => e.currentTarget.style.color = "#10b981"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#e2e8f0"}
              >
                Solutions <ChevronDown />
              </Link>
              <div className="nav-dropdown-menu" style={dropdownStyle}>
                <Link to="/sales" style={dropdownLinkStyle} onClick={closeMenu}>Farmer Sales</Link>
                <Link to="/" style={dropdownLinkStyle} onClick={closeMenu}>Weather Insights</Link>
                <Link to="/dashboard" style={dropdownLinkStyle} onClick={closeMenu}>AI Analytics</Link>
              </div>
            </div>

            {/* Static Links */}
            <Link to="/sales" style={navLinkStyle} onClick={closeMenu}
              onMouseEnter={(e) => e.target.style.color = "#10b981"}
              onMouseLeave={(e) => e.target.style.color = "#e2e8f0"}
            >
              Farmer Sales
            </Link>
            <Link
  to="/resources"
  style={{
    color: "#e2e8f0",
    fontWeight: "500",
    textDecoration: "none",
    fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
    transition: "color 0.3s ease",
  }}
  onMouseEnter={(e) => (e.target.style.color = "#10B981")}
  onMouseLeave={(e) => (e.target.style.color = "#e2e8f0")}
>
  Resources
</Link>
            <Link to="/dashboard" style={navLinkStyle} onClick={closeMenu}
              onMouseEnter={(e) => e.target.style.color = "#10b981"}
              onMouseLeave={(e) => e.target.style.color = "#e2e8f0"}
            >
              Data
            </Link>
            <Link to="/" style={navLinkStyle}
              onMouseEnter={(e) => e.target.style.color = "#10b981"}
              onMouseLeave={(e) => e.target.style.color = "#e2e8f0"}
            >
              About
            </Link>

            {/* Get Demo / Auth Buttons */}
            {user ? (
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <button onClick={handleLogout} style={{
                  padding: "0.5rem 1.2rem",
                  fontSize: "0.9rem",
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
                  onMouseEnter={(e) => e.target.style.background = "#b91c1c"}
                  onMouseLeave={(e) => e.target.style.background = "#dc2626"}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/dashboard" onClick={closeMenu} style={{
                padding: "0.55rem 1.3rem",
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                color: "white",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "0.9rem",
                display: "inline-flex",
                alignItems: "center",
                transition: "all 0.3s ease",
                boxShadow: "0 3px 12px rgba(59, 130, 246, 0.2)",
              }}
                onMouseEnter={(e) => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 6px 20px rgba(59, 130, 246, 0.35)"; }}
                onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 3px 12px rgba(59, 130, 246, 0.2)"; }}
              >
                Data Analytics
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "1.5rem",
              cursor: "pointer",
              padding: "0.5rem",
              zIndex: 1001,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
            background: "rgba(5, 8, 15, 0.98)",
            padding: "1rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            animation: "slideDown 0.3s ease",
          }}>
            <Link to="/" onClick={closeMenu} style={{ ...navLinkStyle, padding: "0.75rem" }}>Home</Link>
            {user && (
              <>
                <Link to="/planner" onClick={closeMenu} style={{ ...navLinkStyle, padding: "0.75rem" }}>Map Planner</Link>
                <Link to="/dashboard" onClick={closeMenu} style={{ ...navLinkStyle, padding: "0.75rem" }}>Dashboard</Link>
              </>
            )}
            <Link to="/dashboard" onClick={closeMenu} style={{ ...navLinkStyle, padding: "0.75rem" }}>Data</Link>
            <Link to="/sales" onClick={closeMenu} style={{ ...navLinkStyle, padding: "0.75rem" }}>Farmer Sales</Link>
            <Link to="/about" onClick={closeMenu} style={{ ...navLinkStyle, padding: "0.75rem" }}>About</Link>

            {user ? (
              <button onClick={handleLogout} style={{
                marginTop: "0.5rem",
                padding: "0.75rem",
                fontSize: "0.9rem",
                background: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}>
                Logout
              </button>
            ) : (
              <Link to="/dashboard" onClick={closeMenu} style={{
                marginTop: "0.5rem",
                padding: "0.75rem",
                textAlign: "center",
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                color: "white",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "0.9rem",
              }}>
                Data Analytics
              </Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;