import { useEffect, useState } from "react";
import { api } from "../services/api";
import "./Analytics.css";

export default function Analytics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await api.get("/analytics/summary");
        setStats(res.data);
      } catch {
        console.log("Waiting for analytics...");
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return <div style={{ padding: 40 }}>📊 Loading analytics…</div>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={titleStyle}>📈 Climate Analytics</h1>
      <p style={subtitleStyle}>
        Insights generated from historical rover data
      </p>

      <div style={grid}>
        <StatCard title="Average AQI" value={stats.avgAqi} />
        <StatCard title="Flood Events" value={stats.floodCount} />
        <StatCard title="Fire Alerts" value={stats.fireCount} />
        <StatCard title="Rover Distance (km)" value={stats.distance} />
      </div>

      <InsightBox />
    </div>
  );
}

/* 📊 STAT CARD */
function StatCard({ title, value }) {
  return (
    <div style={cardStyle}>
      <p style={{ opacity: 0.7 }}>{title}</p>
      <h2 style={{ fontSize: "32px", marginTop: "8px" }}>{value}</h2>
    </div>
  );
}

/* 🧠 INSIGHTS */
function InsightBox() {
  return (
    <div style={insightStyle}>
      <h3>🧠 System Insight</h3>
      <p>
        Increased water levels detected over the past 48 hours. Flood risk
        probability is rising in low-lying zones. Preventive irrigation
        measures recommended.
      </p>
    </div>
  );
}

/* 🎨 STYLES */
const titleStyle = {
  fontSize: "30px",
  fontWeight: "bold",
};

const subtitleStyle = {
  opacity: 0.7,
  marginBottom: "30px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "#020617",
  color: "white",
  padding: "24px",
  borderRadius: "14px",
};

const insightStyle = {
  marginTop: "40px",
  background: "#0f172a",
  padding: "30px",
  borderRadius: "16px",
  borderLeft: "6px solid #22c55e",
};
