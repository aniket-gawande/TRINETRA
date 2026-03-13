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
  
  // Use state for role, initialized from navigation state or defaulting to 'farmer'
  const [role, setRole] = useState(location.state?.role || 'farmer');

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
      navigate('/planner'); // Admin/Gov goes to Mission Planner (marked waypoints)
    } else {
      navigate('/dashboard'); // Farmer goes to regular farmer dashboard
    }
  };

  // Email/Password Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Firebase login successful:", userCredential.user.email);

      const syncData = await syncUserWithBackend(userCredential.user, role);

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
      provider.setCustomParameters({ prompt: 'select_account' });
      
      const userCredential = await signInWithPopup(auth, provider);
      console.log("✅ Google login successful:", userCredential.user.email);

      const syncData = await syncUserWithBackend(userCredential.user, role);

      console.log(`✅ Redirecting ${syncData.role} user...`);
      redirectUser(syncData.role);

    } catch (err) {
      console.error("❌ Google login failed:", err);
      
      if (err.code === 'auth/popup-closed-by-user') {
        setError("Login cancelled");
      } else if (err.code === 'auth/popup-blocked-by-browser') {
        setError("Pop-up blocked. Please allow pop-ups.");
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
      subtitle: 'Access climate data and farm analytics'
    },
    admin: {
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      icon: '🏛️',
      title: 'Admin/Gov',
      subtitle: 'Manage rovers and mark waypoints'
    }
  };

  const config = roleConfig[role];

  return (
    <div className="login-wrapper">
      <div className="login-glass-card">
        
        {/* Left Side - Visual Branding */}
        <div className="login-brand-panel">
          <div className="brand-overlay"></div>
          <div className="brand-content">
            <div className="brand-logo">🚜 TRINETRA</div>
            <h2 className="brand-title">Precision Agriculture For Sustainable Futures</h2>
            <p className="brand-desc">
              Monitor soil health, predict weather impacts, and deploy smart technology with our AI-powered autonomous platform.
            </p>
            
            <div className="brand-features">
              <div className="feature-item">
                <span className="feature-icon">🌱</span>
                <span>Real-time Soil Analytics</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🤖</span>
                <span>Autonomous Rover Control</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span>AI-Driven Insights</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-panel">
          
          <div className="form-header">
            <h2>Welcome Back</h2>
            <p>Please select your portal and sign in to continue.</p>
          </div>

          {/* Role Selector Toggle */}
          <div className="modern-role-toggle">
            <button 
              type="button"
              onClick={() => setRole('farmer')}
              className={`role-btn-modern ${role === 'farmer' ? 'active farmer-active' : ''}`}
            >
              <span className="role-icon">🌾</span>
              Farmer
            </button>
            <button 
              type="button"
              onClick={() => setRole('admin')}
              className={`role-btn-modern ${role === 'admin' ? 'active admin-active' : ''}`}
            >
              <span className="role-icon">🏛️</span>
              Admin / Gov
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="modern-error-box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="login-methods">
            {/* Google Login Button */}
            <button 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="btn-google-modern"
            >
              <svg className="google-icon-svg" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className="modern-divider">
              <span>or sign in with email</span>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleEmailLogin} className="modern-form">
              <div className="input-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <div className="label-row">
                  <label>Password</label>
                  <a href="#" className="forgot-link">Forgot password?</a>
                </div>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className={`btn-submit-modern ${role}-theme`}
              >
                {isLoading ? (
                  <div className="btn-spinner"></div>
                ) : (
                  <>Sign In <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></>
                )}
              </button>
            </form>
          </div>

          <div className="form-footer">
            <p>New to TRINETRA? <Link to="/signup" state={{ role }} className={`signup-link-${role}`}>Create an account</Link></p>
            <p className="home-link-wrap"><Link to="/" className="back-home-link">← Back to Home</Link></p>
          </div>

          {/* Loading Overlay */}
          {isLoading && (
            <div className="global-loading-overlay">
              <div className={`spinner-large ${role}-spinner`}></div>
              <p>Authenticating as {config.title}...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}