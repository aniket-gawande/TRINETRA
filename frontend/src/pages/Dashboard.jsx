import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState({
    aqi: 85,
    temperature: 32,
    humidity: 58,
    waterLevel: 12,
    fire: false,
  });

  // 🔁 Fake live update
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        aqi: Math.floor(Math.random() * 200),
        temperature: 25 + Math.random() * 10,
        humidity: 40 + Math.random() * 30,
        waterLevel: Math.floor(Math.random() * 30),
        fire: Math.random() > 0.8,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        🌍 Climate Mission Control
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        <Card title="AQI (PM2.5)" value={data.aqi} />
        <Card title="Temperature (°C)" value={data.temperature.toFixed(1)} />
        <Card title="Humidity (%)" value={data.humidity.toFixed(0)} />
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
    <div
      style={{
        padding: "20px",
        background: "#0f172a",
        color: "white",
        borderRadius: "10px",
      }}
    >
      <h3 style={{ fontSize: "16px", opacity: 0.8 }}>{title}</h3>
      <p style={{ fontSize: "26px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}
    