import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { api } from "../services/api";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get role from navigation state (passed from Home page)
  const role = location.state?.role || 'farmer'; // Default to farmer if not specified

  // Sync user with backend
  const syncUserWithBackend = async (user, userRole) => {
    try {
      console.log(`🔄 Syncing user with backend as ${userRole}...`);
      
      const token = await user.getIdToken();
      
      const response = await api.post("/auth/sync", 
        { role: userRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ User synced with backend:", response.data);
      return response.data;
    } catch (err) {
      console.error("❌ Backend sync failed:", err);
      throw new Error("Failed to sync with backend");
    }
  };

  // Redirect based on role
  const redirectUser = (userRole) => {
    if (userRole === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/planner'); // Farmer goes to climate dashboard/planner
    }
  };

  // Email/Password Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Step 1: Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Firebase login successful:", userCredential.user.email);

      // Step 2: Sync with Backend
      const syncData = await syncUserWithBackend(userCredential.user, role);

      // Step 3: Redirect based on role
      console.log(`✅ Redirecting ${syncData.role} user...`);
      redirectUser(syncData.role);

    } catch (err) {
      console.error("❌ Login failed:", err);
      
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError("Invalid email or password");
      } else if (err.message === "Failed to sync with backend") {
        setError("Authentication successful but backend sync failed. Please try again.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      
      // Add provider customization for better UX
      provider.setCustomParameters({
        prompt: 'select_account' // Force account selection
      });
      
      // Step 1: Firebase Google Auth
      const userCredential = await signInWithPopup(auth, provider);
      console.log("✅ Google login successful:", userCredential.user.email);

      // Step 2: Sync with Backend
      const syncData = await syncUserWithBackend(userCredential.user, role);

      // Step 3: Redirect based on role
      console.log(`✅ Redirecting ${syncData.role} user...`);
      redirectUser(syncData.role);

    } catch (err) {
      console.error("❌ Google login failed:", {
        code: err.code,
        message: err.message,
        customData: err.customData
      });
      
      if (err.code === 'auth/popup-closed-by-user') {
        setError("Login cancelled");
      } else if (err.code === 'auth/unauthorized-domain') {
        setError("Domain not authorized. Check Firebase Console settings.");
      } else if (err.code === 'auth/operation-not-supported-in-this-environment') {
        setError("Login not available. Check Firebase configuration.");
      } else if (err.code === 'auth/popup-blocked-by-browser') {
        setError("Pop-up blocked by browser. Please allow pop-ups.");
      } else if (err.message === "Failed to sync with backend") {
        setError("Authentication successful but backend sync failed. Please try again.");
      } else {
        setError("Google login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Role-specific styling and text
  const roleConfig = {
    farmer: {
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      icon: '🌾',
      title: 'Farmer',
      subtitle: 'Access climate data and farming insights'
    },
    admin: {
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      icon: '🏛️',
      title: 'Admin',
      subtitle: 'Government & administrative portal'
    }
  };

  const config = roleConfig[role];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Role Badge */}
        <div style={{
          ...styles.roleBadge,
          background: config.gradient,
          marginBottom: '1.5rem'
        }}>
          <span style={{ fontSize: '2rem' }}>{config.icon}</span>
          <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
            {config.title} Portal
          </span>
        </div>

        <h2 style={styles.title}>
          Login to TRINETRA
        </h2>
        
        <p style={styles.subtitle}>
          {config.subtitle}
        </p>

        {/* Error Message */}
        {error && (
          <div style={styles.errorBox}>
            ⚠️ {error}
          </div>
        )}

        {/* Google Login Button */}
        <button 
          onClick={handleGoogleLogin}
          disabled={isLoading}
          style={{
            ...styles.googleBtn,
            opacity: isLoading ? 0.6 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? (
            <>⏳ Signing in...</>
          ) : (
            <>
              <svg style={styles.googleIcon} viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </>
          )}
        </button>

        <div style={styles.divider}>
          <span>or</span>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleEmailLogin}>
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            {isLoading ? '⏳ Signing in...' : `${config.icon} Sign In`}
          </button>
        </form>

        {/* Links */}
        <p style={styles.footer}>
          New to TRINETRA? {' '}
          <Link to="/signup" state={{ role }} style={{ color: config.color }}>
            Create account
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
              Authenticating as {config.title}...
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
    textAlign: "center",
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
  googleBtn: {
    width: "100%",
    padding: "14px",
    background: "white",
    color: "#1f2937",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "all 0.3s",
    marginBottom: "20px",
  },
  googleIcon: {
    width: "20px",
    height: "20px",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    margin: "20px 0",
    color: "#64748b",
    fontSize: "14px",
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

// Add keyframe animation for spinner
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);