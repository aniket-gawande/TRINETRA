import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>TRINETRA</h2>

      <div style={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/planner">Map</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/alerts">Alerts</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    background: "#0f172a",
    color: "white",
  },
  logo: {
    margin: 0,
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "16px",
  },
};
