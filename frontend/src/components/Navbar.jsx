import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav style={styles.nav}>
      <h2>TRINETRA</h2>

      <div style={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/planner">Map</Link>
        <Link to="/dashboard">Dashboard</Link>

        {user && (
          <div style={styles.profile}>
            <span>{user.email}</span>
            <button onClick={() => signOut(auth)}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 24px",
    background: "#020617",
    color: "white",
  },
  links: {
    display: "flex",
    gap: 16,
    alignItems: "center",
  },
  profile: {
    background: "#1e293b",
    padding: "6px 10px",
    borderRadius: 8,
    display: "flex",
    gap: 10,
  },
};
