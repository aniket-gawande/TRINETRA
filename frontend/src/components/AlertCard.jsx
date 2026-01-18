export default function AlertCard({ alert }) {
  const severityColor = {
    HIGH: "#dc2626",
    MEDIUM: "#f59e0b",
    LOW: "#16a34a",
  };

  return (
    <div
      style={{
        borderLeft: `6px solid ${severityColor[alert.severity]}`,
        background: "#0f172a",
        color: "white",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "16px",
      }}
    >
      <h3>
        {alert.type === "FIRE" && "🔥"}
        {alert.type === "FLOOD" && "🌊"}
        {alert.type === "AQI" && "🌫"}{" "}
        {alert.type}
      </h3>

      <p>{alert.message}</p>

      <p>
        📍 {alert.location} | 🕒 {alert.time}
      </p>

      <span
        style={{
          padding: "4px 10px",
          background: severityColor[alert.severity],
          borderRadius: "20px",
          fontSize: "12px",
        }}
      >
        {alert.severity}
      </span>

      <span style={{ marginLeft: "12px" }}>
        {alert.active ? "🟢 Active" : "✅ Resolved"}
      </span>
    </div>
  );
}
