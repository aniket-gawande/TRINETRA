import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🧑‍🌾 Create TRINETRA Account</h2>

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

        <button style={styles.button} onClick={signup}>
          Sign Up
        </button>
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
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: 6,
  },
};
