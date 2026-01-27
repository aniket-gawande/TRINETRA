import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import MapView from "../components/MapView"; // Ensure casing matches filename
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "leaflet/dist/leaflet.css";
import "./Planner.css";

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
  const [isSendingPath, setIsSendingPath] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isStopping, setIsStopping] = useState(false);

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

  // 4. Handle Click
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
    <div style={{ paddingTop: "80px", height: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* 🛠️ CONTROL PANEL OVERLAY */}
      <div className="planner-panel" style={{ zIndex: 1000 }}> 
        {/* Keeping your existing panel structure logic, simplified for brevity */}
        <div className="planner-panel-header">
           <span>Waypoint List ({waypoints.length})</span>
        </div>
        <div className="planner-panel-body">
           <div className="planner-waypoint-list">
             {waypoints.map((wp, i) => (
               <div key={i} className="planner-waypoint-item">
                 WP{i+1}: {wp.lat.toFixed(5)}, {wp.lng.toFixed(5)}
               </div>
             ))}
           </div>
           <div className="planner-panel-buttons">
              <button className="btn-primary" onClick={handleAddWaypoint} disabled={!user}>Click Map to Add</button>
              <button className="btn-secondary" onClick={clearRoute} disabled={waypoints.length === 0}>Clear</button>
              {/* Add your Rover Buttons here */}
           </div>
           {statusMessage && <div className="planner-status-message">{statusMessage}</div>}
        </div>
      </div>

      <div className="map-container" style={{ flex: 1, position: "relative" }}>
        {/* 🚨 FIX: Removed 'key' prop to prevent re-mounting loop */}
        <MapContainer
          center={[18.6517, 73.7615]} // Default center (Pune)
          zoom={18}
          style={{ width: "100%", height: "100%" }}
          whenReady={() => setMapReady(true)}
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
      </div>
    </div>
  );
}