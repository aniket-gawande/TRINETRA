import { useEffect, useState } from "react";
import { api } from "../services/api";
import { getSimulatedCropData } from "../utils/fakeCropData";
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
  const [cropImage, setCropImage] = useState(null);
  const [cropAnalysis, setCropAnalysis] = useState(null);

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

  // Fetch latest crop image and analysis
  useEffect(() => {
    const fetchCropData = async () => {
      try {
        // Fetch latest rover image
        const imageRes = await api.get("/rover/latest-image");
        if (imageRes.data?.success && imageRes.data?.image) {
          setCropImage(imageRes.data.image);
        }

        // Generate AI-based crop analysis
        const analysisRes = await api.get("/rover/crop-analysis");
        if (analysisRes.data?.success) {
          setCropAnalysis(analysisRes.data.analysis);
        }
      } catch (err) {
        console.warn("⚠️  Could not fetch crop data from backend:", err.message);
        // Use simulated data for development/demo
        const simulated = getSimulatedCropData(latestData);
        setCropImage(simulated.image);
        setCropAnalysis(simulated.analysis);
      }
    };

    fetchCropData();
    const interval = setInterval(fetchCropData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [latestData]);

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

      {/* Crop Analysis Section with Image */}
      {cropImage && cropAnalysis && (
        <section className="crop-analysis-section">
          <h2>🌾 Crop Analysis & AI Recommendations</h2>
          <div className="crop-analysis-container">
            {/* Crop Image */}
            <div className="crop-image-box">
              <img 
                src={cropImage.imageUrl} 
                alt="Crop from Rover Camera" 
                className="crop-image"
              />
              <p className="image-caption">📷 Captured by rover camera</p>
            </div>

            {/* Crop Details and Analysis */}
            <div className="crop-details-box">
              {/* Microclimate Summary */}
              <div className="microclimate-summary">
                <h3>🌡️ Microclimate Summary</h3>
                <ul className="microclimate-list">
                  <li><strong>Temp:</strong> {latestData?.temperature?.toFixed(1) || "N/A"}°C</li>
                  <li><strong>Humidity:</strong> {latestData?.humidity?.toFixed(1) || "N/A"}%</li>
                  <li><strong>Soil Moisture:</strong> {cropAnalysis?.soilMoisture || "N/A"}%</li>
                  <li><strong>AQI:</strong> {latestData?.aqi?.toFixed(1) || "N/A"}</li>
                  <li><strong>PM2.5:</strong> {cropAnalysis?.pm25 || "N/A"} Moderate</li>
                </ul>
              </div>

              {/* Crop Analysis Results */}
              <div className="crop-analysis-results">
                <h3>🌱 Crop Analysis</h3>
                <div className="health-score-box">
                  <div className="health-score-circle">
                    <span className="score-number">{cropAnalysis?.healthScore || 75}</span>
                    <span className="score-label">Health Score</span>
                  </div>
                  <div className="analysis-metrics">
                    <div className="metric">
                      <span className="metric-icon">✅</span>
                      <span className="metric-text">Disease Risk: <strong>{cropAnalysis?.diseaseRisk || "Low"}</strong></span>
                    </div>
                    <div className="metric">
                      <span className="metric-icon">💧</span>
                      <span className="metric-text">Water Need: <strong>{cropAnalysis?.waterNeed || "Moderate"}</strong></span>
                    </div>
                    <div className="metric">
                      <span className="metric-icon">🌾</span>
                      <span className="metric-text">Growth Stage: <strong>{cropAnalysis?.growthStage || "Vegetative"}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="recommendations-box">
                  <h4>💡 AI Recommendations</h4>
                  <ul className="recommendations-list">
                    {cropAnalysis?.recommendations?.map((rec, idx) => (
                      <li key={idx}>
                        <span className="checkmark">✔</span> {rec}
                      </li>
                    )) || (
                      <>
                        <li><span className="checkmark">✔</span> Increase Irrigation</li>
                        <li><span className="checkmark">✔</span> Apply NPK Fertilizer</li>
                        <li><span className="checkmark">✔</span> Use Neem Spray</li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Download Buttons */}
                <div className="download-buttons">
                  <button className="btn-download pdf">📄 Download PDF</button>
                  <button className="btn-download csv">📊 Download CSV</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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
