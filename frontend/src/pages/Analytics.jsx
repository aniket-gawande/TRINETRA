import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";

import {
  aqiHistory,
  tempHumidity,
  pollutionByArea,
} from "../utils/fakeAnalyticsData";

export default function Analytics() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>📊 Climate Analytics</h1>

      {/* AQI Over Time */}
      <section style={{ marginTop: "40px" }}>
        <h3>AQI Trend (Last 12 Hours)</h3>
        <LineChart width={800} height={300} data={aqiHistory}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="aqi" stroke="#dc2626" />
        </LineChart>
      </section>

      {/* Temperature vs Humidity */}
      <section style={{ marginTop: "60px" }}>
        <h3>Temperature vs Humidity</h3>
        <LineChart width={800} height={300} data={tempHumidity}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey="temperature" stroke="#f59e0b" />
          <Line dataKey="humidity" stroke="#2563eb" />
        </LineChart>
      </section>

      {/* Pollution by Area */}
      <section style={{ marginTop: "60px" }}>
        <h3>Pollution by Region</h3>
        <BarChart width={800} height={300} data={pollutionByArea}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="area" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="aqi" fill="#7c3aed" />
        </BarChart>
      </section>
    </div>
  );
}
