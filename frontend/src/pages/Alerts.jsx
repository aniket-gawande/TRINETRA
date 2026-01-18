import AlertCard from "../components/AlertCard";
import { alerts } from "../utils/fakeAlerts";

export default function Alerts() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>🚨 Alerts & Events</h1>
      <p>Real-time environmental and disaster alerts</p>

      <div style={{ marginTop: "30px" }}>
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
}
    