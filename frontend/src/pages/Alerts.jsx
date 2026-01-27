import { useEffect, useState } from "react";
import { api } from "../services/api";
import "./Alerts.css";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await api.get("/alerts");
        setAlerts(res.data);
      } catch {
        console.log("Waiting for alerts...");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={titleStyle}>🚨 Alerts & Warnings</h1>
      <p style={subtitleStyle}>
        Real-time environmental risk detection from rover sensors
      </p>

      {alerts.length === 0 ? (
        <div style={emptyState}>✅ No active alerts</div>
      ) : (
        <div style={alertGrid}>
          {alerts.map((alert, index) => (
            <AlertCard key={index} alert={alert} />
          ))}
        </div>
      )}
    </div>
  );
}

/* 🔔 ALERT CARD */
function AlertCard({ alert }) {
  const color =
    alert.level === "CRITICAL"
      ? "#dc2626"
      : alert.level === "WARNING"
      ? "#f59e0b"
      : "#16a34a";

  return (
    <div style={{ ...cardStyle, borderLeft: `6px solid ${color}` }}>
      <h3 style={{ fontSize: "18px", color }}>{alert.type}</h3>
      <p style={{ opacity: 0.85 }}>{alert.message}</p>

      <div style={metaRow}>
        <span>📍 {alert.location}</span>
        <span>🕒 {new Date(alert.time).toLocaleTimeString()}</span>
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const titleStyle = {
  fontSize: "30px",
  fontWeight: "bold",
  marginBottom: "6px",
};

const subtitleStyle = {
  opacity: 0.7,
  marginBottom: "30px",
};

const alertGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "#0f172a",
  color: "white",
  padding: "20px",
  borderRadius: "12px",
};

const metaRow = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "12px",
  fontSize: "13px",
  opacity: 0.7,
};

const emptyState = {
  padding: "40px",
  background: "#020617",
  borderRadius: "12px",
  color: "#22c55e",
  fontSize: "18px",
};
