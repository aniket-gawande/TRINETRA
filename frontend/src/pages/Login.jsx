import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch {
      alert("Invalid login credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🔐 TRINETRA Login</h2>

        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={login}>
          Login
        </button>

        <p style={{ marginTop: 12 }}>
          New here? <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "linear-gradient(135deg,#020617,#0f172a)",
  },
  card: {
    background: "#020617",
    padding: 30,
    width: 320,
    borderRadius: 12,
    color: "white",
    boxShadow: "0 20px 40px rgba(0,0,0,.5)",
  },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 12,
    borderRadius: 6,
    border: "1px solid #334155",
    background: "#020617",
    color: "white",
  },
  button: {
    width: "100%",
    padding: 12,
    marginTop: 16,
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};
