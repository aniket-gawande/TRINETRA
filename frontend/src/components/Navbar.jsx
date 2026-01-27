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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={closeMenu}
        />
      )}

      {/* Navigation Bar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          background: "rgba(2, 6, 4, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(51, 65, 85, 0.5)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "80px",
            padding: "0 clamp(1rem, 4vw, 2rem)",
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: "800",
                background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
              }}
            >
              🚜 PARYARAK
            </span>
          </Link>

          {/* Desktop Menu */}
          <div
            style={{
              display: "none",
            }}
            className="hidden-mobile"
          >
            <style>
              {`
                @media (min-width: 769px) {
                  .desktop-menu {
                    display: flex !important;
                  }
                }
              `}
            </style>
            <div
              className="desktop-menu"
              style={{
                display: "flex",
                gap: "clamp(1rem, 2vw, 2rem)",
                alignItems: "center",
              }}
            >
              <Link
                to="/"
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
                Home
              </Link>

              {user && (
                <>
                  <Link
                    to="/planner"
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
                    Map Planner
                  </Link>
                  <Link
                    to="/dashboard"
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
                    Dashboard
                  </Link>
                </>
              )}

              {user ? (
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <span
                    style={{
                      color: "#94a3b8",
                      fontSize: "clamp(0.75rem, 1vw, 0.9rem)",
                      display: "none",
                    }}
                    className="hidden-mobile"
                  >
                    {user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    style={{
                      padding: "clamp(0.5rem, 1vw, 0.6rem) clamp(0.8rem, 2vw, 1.2rem)",
                      fontSize: "clamp(0.8rem, 1vw, 0.9rem)",
                      background: "#dc2626",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.background = "#b91c1c")}
                    onMouseLeave={(e) => (e.target.background = "#dc2626")}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  style={{
                    padding: "clamp(0.5rem, 1vw, 0.6rem) clamp(0.8rem, 2vw, 1.2rem)",
                    fontSize: "clamp(0.8rem, 1vw, 0.9rem)",
                    background: "#2563eb",
                    color: "white",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#1d4ed8")}
                  onMouseLeave={(e) => (e.target.style.background = "#2563eb")}
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "1.5rem",
              cursor: "pointer",
              padding: "0.5rem",
              zIndex: 1001,
            }}
            className="hidden-desktop"
          >
            <style>
              {`
                @media (max-width: 768px) {
                  button.hidden-desktop {
                    display: block !important;
                  }
                }
              `}
            </style>
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              background: "rgba(2, 6, 4, 0.98)",
              padding: "1rem",
              borderTop: "1px solid rgba(51, 65, 85, 0.5)",
              animation: "slideDown 0.3s ease",
            }}
            className="hidden-mobile"
          >
            <style>
              {`
                @media (max-width: 768px) {
                  div.hidden-mobile {
                    display: flex !important;
                  }
                }
                
                @keyframes slideDown {
                  from {
                    opacity: 0;
                    transform: translateY(-10px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}
            </style>
            <Link
              to="/"
              onClick={closeMenu}
              style={{
                color: "#e2e8f0",
                fontWeight: "500",
                textDecoration: "none",
                padding: "0.75rem",
                borderRadius: "6px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.background = "rgba(16, 185, 129, 0.1)")}
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              Home
            </Link>

            {user && (
              <>
                <Link
                  to="/planner"
                  onClick={closeMenu}
                  style={{
                    color: "#e2e8f0",
                    fontWeight: "500",
                    textDecoration: "none",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "rgba(16, 185, 129, 0.1)")}
                  onMouseLeave={(e) => (e.target.style.background = "transparent")}
                >
                  Map Planner
                </Link>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  style={{
                    color: "#e2e8f0",
                    fontWeight: "500",
                    textDecoration: "none",
                    padding: "0.75rem",
                    borderRadius: "6px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "rgba(16, 185, 129, 0.1)")}
                  onMouseLeave={(e) => (e.target.style.background = "transparent")}
                >
                  Dashboard
                </Link>
              </>
            )}

            {user ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <span style={{ color: "#94a3b8", fontSize: "0.9rem", padding: "0.75rem" }}>
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: "0.75rem",
                    fontSize: "0.9rem",
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#b91c1c")}
                  onMouseLeave={(e) => (e.target.style.background = "#dc2626")}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                style={{
                  padding: "0.75rem",
                  fontSize: "0.9rem",
                  background: "#2563eb",
                  color: "white",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontWeight: "600",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.background = "#1d4ed8")}
                onMouseLeave={(e) => (e.target.style.background = "#2563eb")}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;