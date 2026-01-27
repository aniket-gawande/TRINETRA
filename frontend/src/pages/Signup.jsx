import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { api } from "../services/api";
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get role from navigation state (passed from Login page)
  const role = location.state?.role || 'farmer';

  // Sync user with backend
  const syncUserWithBackend = async (user, userRole) => {
    try {
      console.log(`🔄 Syncing new user with backend as ${userRole}...`);
      
      const token = await user.getIdToken();
      
      const response = await api.post("/auth/sync", 
        { role: userRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ New user synced:", response.data);
      return response.data;
    } catch (err) {
      console.error("❌ Backend sync failed:", err);
      throw new Error("Failed to complete registration");
    }
  };

  // Redirect based on role
  const redirectUser = (userRole) => {
    if (userRole === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/planner');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("✅ Firebase account created:", userCredential.user.email);

      // Step 2: Sync with Backend (Save role)
      const syncData = await syncUserWithBackend(userCredential.user, role);

      // Step 3: Redirect based on role
      console.log(`✅ Redirecting new ${syncData.role} user...`);
      redirectUser(syncData.role);

    } catch (err) {
      console.error("❌ Signup failed:", err);
      
      if (err.code === 'auth/email-already-in-use') {
        setError("Email already registered. Please login instead.");
      } else if (err.code === 'auth/weak-password') {
        setError("Password is too weak. Use at least 6 characters.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Invalid email address");
      } else if (err.message === "Failed to complete registration") {
        setError("Account created but registration incomplete. Please try logging in.");
      } else {
        setError("Signup failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Role-specific config
  const roleConfig = {
    farmer: {
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      icon: '🌾',
      title: 'Farmer',
    },
    admin: {
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      icon: '🏛️',
      title: 'Admin',
    }
  };

  const config = roleConfig[role];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Role Badge */}
        <div style={{
          ...styles.roleBadge,
          background: config.gradient
        }}>
          <span style={{ fontSize: '2rem' }}>{config.icon}</span>
          <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
            {config.title} Registration
          </span>
        </div>

        <h2 style={styles.title}>Create TRINETRA Account</h2>
        
        <p style={styles.subtitle}>
          Join as a {config.title.toLowerCase()} to access climate intelligence
        </p>

        {/* Error Message */}
        {error && (
          <div style={styles.errorBox}>
            ⚠️ {error}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSignup}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
          
          <input
            style={styles.input}
            type="password"
            placeholder="Password (min. 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          
          <input
            style={styles.input}
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            required
          />

          <button 
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.button,
              background: config.gradient,
              opacity: isLoading ? 0.6 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? '⏳ Creating Account...' : `${config.icon} Create Account`}
          </button>
        </form>

        {/* Links */}
        <p style={styles.footer}>
          Already have an account? {' '}
          <Link to="/login" state={{ role }} style={{ color: config.color }}>
            Sign in
          </Link>
        </p>

        <p style={styles.footer}>
          Wrong portal? {' '}
          <Link to="/" style={{ color: config.color }}>
            Back to Home
          </Link>
        </p>

        {/* Loading Overlay */}
        {isLoading && (
          <div style={styles.loadingOverlay}>
            <div style={styles.spinner}></div>
            <p style={{ marginTop: '1rem', color: config.color }}>
              Creating {config.title} account...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "linear-gradient(135deg, #020617, #0f172a)",
    padding: "20px",
  },
  card: {
    background: "#020617",
    padding: "40px",
    width: "100%",
    maxWidth: "420px",
    borderRadius: "16px",
    color: "white",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    border: "1px solid rgba(255,255,255,0.1)",
    position: "relative",
  },
  roleBadge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "12px 20px",
    borderRadius: "30px",
    color: "white",
    marginBottom: "1.5rem",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "8px",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "14px",
    color: "#94a3b8",
    marginBottom: "30px",
    textAlign: "center",
  },
  errorBox: {
    padding: "12px",
    background: "#7f1d1d",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px",
    border: "1px solid #dc2626",
  },
  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "16px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "white",
    fontSize: "15px",
    transition: "all 0.3s",
  },
  button: {
    width: "100%",
    padding: "14px",
    marginTop: "8px",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  footer: {
    marginTop: "20px",
    fontSize: "14px",
    textAlign: "center",
    color: "#94a3b8",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(2, 6, 23, 0.95)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "16px",
    zIndex: 10,
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "4px solid rgba(255,255,255,0.1)",
    borderTop: "4px solid #10b981",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

// Add keyframe animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);