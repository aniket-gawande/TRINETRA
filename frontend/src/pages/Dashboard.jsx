import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState(null);

  /* 📡 FETCH LIVE SENSOR DATA FROM BACKEND */
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await api.get("/sensors/latest");
        setData(res.data);
      } catch {
        console.log("Waiting for sensor data...");
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return <div style={{ padding: 40 }}>📡 Waiting for sensor data…</div>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        🌍 Climate Mission Control
      </h1>

      <div style={gridStyle}>
        <Card title="AQI (PM2.5)" value={data.aqi} />
        <Card title="Temperature (°C)" value={data.temperature} />
        <Card title="Humidity (%)" value={data.humidity} />
        <Card title="Water Level (cm)" value={data.waterLevel} />
        <Card
          title="Fire Status"
          value={data.fire ? "🔥 DETECTED" : "✅ Normal"}
        />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={cardStyle}>
      <h3 style={{ fontSize: "16px", opacity: 0.8 }}>{title}</h3>
      <p style={{ fontSize: "26px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  padding: "20px",
  background: "#0f172a",
  color: "white",
  borderRadius: "10px",
};
