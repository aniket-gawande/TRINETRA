import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import MapView from "../components/MapView";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "leaflet/dist/leaflet.css";
import "./planner.css"; // Updated import to match file casing

export default function Planner() {
  const { user } = useAuth();
  const [waypoints, setWaypoints] = useState([]);
  // Default to Pune/PCCOE until GPS loads
  const [userPosition, setUserPosition] = useState({
    lat: 18.6517,
    lng: 73.7615,
  });
  const [roverPosition, setRoverPosition] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  // Rover / ESP32 status
  const [roverStatus, setRoverStatus] = useState("Idle");
  const [roverConnected, setRoverConnected] = useState(false);
  const [roverIp, setRoverIp] = useState("");
  const [pingMs, setPingMs] = useState(null);
  
  // Mobile Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 1. Load User Location (Run once)
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          // Only update if moved significantly to reduce renders
          setUserPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => console.warn("Location error:", err),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // 2. Load Waypoints
  useEffect(() => {
    if (user) {
      api.get("/waypoints")
        .then((res) => {
          const waypointsArray = res.data.waypoints || [];
          const normalized = waypointsArray.map(wp => ({
            _id: wp._id,
            lat: parseFloat(wp.lat),
            lng: parseFloat(wp.lng),
            order: wp.order
          }));
          setWaypoints(normalized);
          if (normalized.length > 0) setStatusMessage(`✅ Loaded ${normalized.length} waypoints`);
        })
        .catch(() => setWaypoints([]));
    }
  }, [user]);

  // 3. Poll Rover
  useEffect(() => {
    const interval = setInterval(async () => {
      const start = performance.now();
      try {
        const res = await api.get("/rover/gps");
        if (res.data && typeof res.data.lat === "number") {
          setRoverPosition(res.data);
          setRoverConnected(true);
          setPingMs(Math.round(performance.now() - start));
          if (res.data.ip) setRoverIp(res.data.ip);
        }
      } catch {
        setRoverConnected(false);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // 4. Handle Click (Logic preserved)
  const handleAddWaypoint = async (latlng) => {
    if (!user) return alert("Please login to add waypoints.");
    
    setIsSaving(true);
    setStatusMessage("⏳ Saving...");
    
    try {
      const newPoint = { lat: latlng.lat, lng: latlng.lng, order: waypoints.length + 1 };
      const res = await api.post("/waypoints", newPoint);
      const saved = res.data.waypoint || res.data;
      
      setWaypoints([...waypoints, { ...saved, lat: parseFloat(saved.lat), lng: parseFloat(saved.lng) }]);
      setStatusMessage(`✅ Waypoint saved!`);
    } catch (err) {
      setStatusMessage("❌ Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  const clearRoute = async () => {
    if (!window.confirm("Delete all waypoints?")) return;
    try {
      await api.delete("/waypoints");
      setWaypoints([]);
      setStatusMessage("🗑️ Route cleared");
    } catch (err) {
      alert("Failed to clear");
    }
  };

  return (
    <div style={{ paddingTop: "80px" }}>
      <div className="planner-container" style={{ display: "flex" }}>
        
        {/* =======================
            LEFT SIDEBAR (Table/List)
           ======================= */}
        <aside className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
          <div className="sidebar-header">
            <h2>Mission Planner</h2>
            <p>{waypoints.length} Waypoints Set</p>
          </div>

          <div className="sidebar-content">
            {waypoints.length === 0 ? (
              <div style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>
                <p style={{ marginBottom: "0.5rem" }}>No waypoints defined.</p>
                <small>Tap on the map to create a path.</small>
              </div>
            ) : (
              <div className="waypoint-list-container">
                {waypoints.map((wp, i) => (
                  <div key={i} className="waypoint-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <h3>Stop #{i + 1}</h3>
                      <span className="badge">Pending</span>
                    </div>
                    <div className="waypoint-coords">
                      LAT: {wp.lat.toFixed(6)} <br/>
                      LNG: {wp.lng.toFixed(6)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="sidebar-footer">
            {statusMessage && (
              <div className="planner-status-message" style={{ marginBottom: "10px" }}>
                {statusMessage}
              </div>
            )}
            
            <div className="planner-panel-buttons">
              <button className="btn-primary" style={{ width: '100%' }} disabled={!user}>
                 Click Map to Add Point
              </button>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button 
                  className="btn-secondary" 
                  style={{ flex: 1 }}
                  onClick={clearRoute} 
                  disabled={waypoints.length === 0}
                >
                  Clear Path
                </button>
                {/* Placeholder for future Rover Start/Stop buttons */}
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        <div 
          className={`mobile-sidebar-overlay ${!isSidebarOpen ? 'hidden' : ''}`} 
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* =======================
            MAIN MAP AREA
           ======================= */}
        <div className="map-container" style={{ flex: 1, position: "relative" }}>
          <MapContainer
            center={[18.6517, 73.7615]} // Default center (Pune)
            zoom={18}
            style={{ width: "100%", height: "100%" }}
            whenReady={() => setMapReady(true)}
            zoomControl={false} // Custom zoom position if needed, or default
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapView
              waypoints={waypoints}
              roverPosition={roverPosition}
              userPosition={userPosition}
              onAdd={handleAddWaypoint}
            />
          </MapContainer>

          {/* Mobile Toggle Button */}
          <button 
            className="mobile-toggle" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? '✕' : '☰'}
          </button>
        </div>

      </div>
    </div>
  );
}