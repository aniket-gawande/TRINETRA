import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <h2 style={styles.logo}>TRINETRA</h2>

        <div style={styles.links}>
          <NavLink to="/" style={navLinkStyle}>Home</NavLink>
          <NavLink to="/planner" style={navLinkStyle}>Map</NavLink>
          <NavLink to="/dashboard" style={navLinkStyle}>Dashboard</NavLink>
          <NavLink to="/analytics" style={navLinkStyle}>Analytics</NavLink>
          <NavLink to="/alerts" style={navLinkStyle}>Alerts</NavLink>
          <NavLink to="/about" style={navLinkStyle}>About</NavLink>
        </div>
      </div>
    </nav>
  );
}

/* 🔗 Active / Normal link styling */
const navLinkStyle = ({ isActive }) => ({
  color: isActive ? "#38bdf8" : "white",
  textDecoration: "none",
  fontWeight: 500,
  fontSize: "15px",
  padding: "6px 10px",
  borderRadius: "6px",
  transition: "all 0.2s ease",
  background: isActive ? "rgba(56,189,248,0.15)" : "transparent",
});

/* 🎨 Styles */
const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 2000,
    background: "rgba(2, 6, 23, 0.85)", // glass effect
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },

  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "12px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    margin: 0,
    color: "white",
    fontWeight: 700,
    letterSpacing: "1px",
  },

  links: {
    display: "flex",
    gap: "14px",
  },
};
