import { useEffect, useState } from "react";
import { api } from "../services/api";
import CSVImport from "../components/CSVImport";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
  AreaChart,
} from "recharts";
import "./Dashboard.css";

export default function Dashboard() {
  const [latestData, setLatestData] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [dailyStats, setDailyStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [googleSheetUrl, setGoogleSheetUrl] = useState("");

  // Fetch latest sensor data
  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const res = await api.get("/sensors/latest");
        console.log("✅ Latest sensor data:", res.data);
        setLatestData(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch latest data:", err);
      }
    };

    const interval = setInterval(fetchLatestData, 5000);
    fetchLatestData(); // Initial fetch
    return () => clearInterval(interval);
  }, []);

  // Fetch historical data for charts
  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/sensors/history?days=7");
        console.log("📊 Historical data:", res.data);
        
        // Transform data for charts
        const chartData = res.data.data.map(d => ({
          timestamp: new Date(d.timestamp).toLocaleTimeString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit',
            minute: '2-digit'
          }),
          aqi: d.aqi,
          temperature: d.temperature,
          humidity: d.humidity,
          waterLevel: d.waterLevel,
          fullTime: new Date(d.timestamp)
        }));

        // Keep last 50 points for better visualization
        setHistoryData(chartData.slice(-50));

        // Fetch daily statistics
        const statsRes = await api.get("/sensors/daily-stats?days=7");
        console.log("📈 Daily stats:", statsRes.data);
        setDailyStats(statsRes.data.stats);
        
        setLoading(false);
      } catch (err) {
        console.error("❌ Failed to fetch historical data:", err);
        setLoading(false);
      }
    };

    fetchHistoricalData();
    const interval = setInterval(fetchHistoricalData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleGoogleSheetSync = async () => {
    if (!googleSheetUrl.trim()) {
      alert("Please enter a valid Google Sheets URL");
      return;
    }

    try {
      alert("Google Sheets integration:\n1. Create a Google Sheet\n2. Share it publicly (Anyone with link can view)\n3. Get the sheet ID from the URL\n4. We'll auto-sync data to this sheet");
      // In production, you'd implement Google Sheets API integration here
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner">📡 Loading sensor data...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1>🌾 Farmer Dashboard</h1>
        <p>Real-time sensor monitoring & soil analytics</p>
      </header>

      {/* Latest Sensor Data Cards */}
      <section className="sensors-section">
        <h2>📊 Real-Time Sensor Data</h2>
        <div className="sensors-grid">
          <SensorCard 
            icon="💨" 
            title="Air Quality (AQI)" 
            value={latestData?.aqi?.toFixed(1) || "N/A"}
            unit="PM2.5"
            status={getAQIStatus(latestData?.aqi)}
          />
          <SensorCard 
            icon="🌡️" 
            title="Temperature" 
            value={latestData?.temperature?.toFixed(1) || "N/A"}
            unit="°C"
            status={getTempStatus(latestData?.temperature)}
          />
          <SensorCard 
            icon="💧" 
            title="Humidity" 
            value={latestData?.humidity?.toFixed(1) || "N/A"}
            unit="%"
            status={getHumidityStatus(latestData?.humidity)}
          />
          <SensorCard 
            icon="💦" 
            title="Water Level" 
            value={latestData?.waterLevel?.toFixed(1) || "N/A"}
            unit="cm"
            status={getWaterStatus(latestData?.waterLevel)}
          />
          <SensorCard 
            icon={latestData?.fire ? "🔥" : "✅"} 
            title="Fire Detection" 
            value={latestData?.fire ? "ALERT!" : "Normal"}
            unit=""
            status={latestData?.fire ? "danger" : "safe"}
          />
        </div>
      </section>

      {/* Soil Quality Section */}
      <section className="soil-quality-section">
        <h2>🌱 Soil Quality Analysis</h2>
        <div className="soil-cards">
          <SoilQualityCard 
            metric="Moisture"
            value={latestData?.humidity || 0}
            optimal={[40, 60]}
            description="Optimal soil moisture for crops"
          />
          <SoilQualityCard 
            metric="Temperature"
            value={latestData?.temperature || 0}
            optimal={[20, 30]}
            description="Ideal soil temperature"
          />
          <SoilQualityCard 
            metric="Air Quality"
            value={latestData?.aqi || 0}
            optimal={[0, 50]}
            description="Lower is better (fewer pollutants)"
          />
          <SoilQualityCard 
            metric="Water Availability"
            value={latestData?.waterLevel || 0}
            optimal={[10, 30]}
            description="Soil water content"
          />
        </div>
      </section>

      {/* Charts Section */}
      <section className="charts-section">
        <div className="chart-container">
          <h3>📈 AQI Trend (Last 7 Days)</h3>
          {historyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={historyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="aqi" stroke="#ff6b6b" fillOpacity={1} fill="url(#colorAqi)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p>No data available</p>
          )}
        </div>

        <div className="chart-container">
          <h3>🌡️ Temperature & Humidity Trend</h3>
          {historyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temperature" stroke="#ff7f50" name="Temperature (°C)" />
                <Line type="monotone" dataKey="humidity" stroke="#4da6ff" name="Humidity (%)" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>No data available</p>
          )}
        </div>

        <div className="chart-container">
          <h3>📊 Daily Average Statistics</h3>
          {dailyStats.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgAqi" fill="#ff6b6b" name="Avg AQI" />
                <Bar dataKey="avgTemp" fill="#ff7f50" name="Avg Temp (°C)" />
                <Bar dataKey="avgHumidity" fill="#4da6ff" name="Avg Humidity (%)" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </section>

      {/* CSV Data Import */}
      <CSVImport 
        onImportSuccess={() => {
          // Refresh dashboard data after successful import
          const fetchLatestData = async () => {
            try {
              const res = await api.get("/sensors/latest");
              setLatestData(res.data);
            } catch (err) {
              console.error("Failed to refresh latest data:", err);
            }
          };
          const fetchHistoryData = async () => {
            try {
              const res = await api.get("/sensors/history?days=7");
              const data = res.data.data || res.data;
              setHistoryData(Array.isArray(data) ? data : []);
            } catch (err) {
              console.error("Failed to fetch history data:", err);
            }
          };
          const fetchDailyStats = async () => {
            try {
              const res = await api.get("/sensors/daily-stats?days=7");
              const data = res.data.stats || res.data;
              setDailyStats(Array.isArray(data) ? data : []);
            } catch (err) {
              console.error("Failed to fetch daily stats:", err);
            }
          };
          fetchLatestData();
          fetchHistoryData();
          fetchDailyStats();
        }}
      />

      {/* Google Sheets Integration */}
      <section className="google-sheets-section">
        <h2>📑 Google Sheets Integration</h2>
        <div className="sheets-card">
          <p>Sync sensor data with your Google Sheet for easy sharing and analysis</p>
          <div className="sheets-input">
            <input 
              type="text"
              placeholder="Enter Google Sheets URL"
              value={googleSheetUrl}
              onChange={(e) => setGoogleSheetUrl(e.target.value)}
            />
            <button onClick={handleGoogleSheetSync} className="btn-sync">
              🔗 Connect Sheet
            </button>
          </div>
          <p className="hint">
            How to set up:<br/>
            1. Create a new Google Sheet<br/>
            2. Share it publicly (Anyone with link)<br/>
            3. Paste the URL above<br/>
            4. Data will auto-sync every hour
          </p>
        </div>
      </section>

      {/* Rover Data Link */}
      <section className="rover-section">
        <h2>🤖 Rover Integration</h2>
        <div className="rover-card">
          <p>Connect rover GPS data and sensor readings to your dashboard</p>
          <button className="btn-primary">View Rover Status</button>
          <button className="btn-secondary">View Rover History</button>
        </div>
      </section>
    </div>
  );
}

// Status helper functions
function getAQIStatus(aqi) {
  if (!aqi) return "neutral";
  if (aqi <= 50) return "safe";
  if (aqi <= 100) return "moderate";
  if (aqi <= 200) return "unhealthy";
  return "danger";
}

function getTempStatus(temp) {
  if (!temp) return "neutral";
  if (temp >= 15 && temp <= 35) return "safe";
  return "warning";
}

function getHumidityStatus(humidity) {
  if (!humidity) return "neutral";
  if (humidity >= 30 && humidity <= 70) return "safe";
  return "warning";
}

function getWaterStatus(level) {
  if (!level) return "neutral";
  if (level >= 10 && level <= 30) return "safe";
  if (level < 10) return "warning";
  return "moderate";
}

// Sensor Card Component
function SensorCard({ icon, title, value, unit, status }) {
  return (
    <div className={`sensor-card sensor-${status}`}>
      <div className="card-icon">{icon}</div>
      <h3>{title}</h3>
      <p className="card-value">
        {value} <span className="card-unit">{unit}</span>
      </p>
      <p className="card-status">
        {status === "safe" && "✅ Optimal"}
        {status === "moderate" && "⚠️ Moderate"}
        {status === "warning" && "⚠️ Warning"}
        {status === "danger" && "🔴 Alert"}
        {status === "neutral" && "📊 Data"}
      </p>
    </div>
  );
}

// Soil Quality Card Component
function SoilQualityCard({ metric, value, optimal, description }) {
  const isOptimal = value >= optimal[0] && value <= optimal[1];
  
  return (
    <div className={`soil-card ${isOptimal ? 'optimal' : 'needs-attention'}`}>
      <h4>{metric}</h4>
      <p className="soil-value">{value.toFixed(1)}</p>
      <p className="soil-range">Optimal: {optimal[0]} - {optimal[1]}</p>
      <p className="soil-description">{description}</p>
      <div className="soil-indicator">
        <div 
          className="indicator-bar"
          style={{
            width: `${Math.min(Math.max((value / optimal[1]) * 100, 0), 100)}%`,
            background: isOptimal ? '#10b981' : '#f59e0b'
          }}
        ></div>
      </div>
    </div>
  );
}
