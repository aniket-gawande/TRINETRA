import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import MapView from "../components/mapview"; // ⚠️ ENSURE FILENAME IS mapview.jsx
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "leaflet/dist/leaflet.css";

export default function Planner() {
  const { user } = useAuth(); // Consuming context from AuthContext.jsx
  const [waypoints, setWaypoints] = useState([]);
  const [userPosition, setUserPosition] = useState({ lat: 18.6517, lng: 73.7615 }); // PCCOE Default
  const [roverPosition, setRoverPosition] = useState(null);

  // 1. Load User Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => console.warn("Location access denied or error:", err)
      );
    }
  }, []);

  // 2. Load Existing Waypoints (Only if user is logged in)
  useEffect(() => {
    if (user) {
      api.get("/waypoints")
        .then((res) => setWaypoints(res.data))
        .catch((err) => console.error("Failed to load waypoints:", err));
    }
  }, [user]);

  // 3. 🚗 Poll Rover Position
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await api.get("/rover/gps");
        if (res.data && typeof res.data.lat === 'number') {
           setRoverPosition(res.data);
        }
      } catch (e) { 
        // Silent fail (offline) 
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // 4. 🖱️ HANDLE CLICK & SAVE
  const handleAddWaypoint = async (latlng) => {
    if (!user) {
      alert("Please login to mark waypoints");
      return;
    }

    // Validate Data
    if (!latlng || typeof latlng.lat !== 'number' || typeof latlng.lng !== 'number') {
      console.error("Invalid LatLng data:", latlng);
      return;
    }

    try {
      const newPoint = {
        lat: latlng.lat,
        lng: latlng.lng,
        order: waypoints.length + 1,
      };

      console.log("Saving Waypoint:", newPoint);

      // Save to Backend
      const res = await api.post("/waypoints", newPoint);
      
      // Update UI immediately
      setWaypoints([...waypoints, res.data]); 

    } catch (err) {
      console.error("❌ Save Failed:", err);
      // Extract specific error message from backend response if available
      const msg = err.response?.data?.message || err.response?.data?.error || "Could not save waypoint.";
      alert(`Error: ${msg}`);
    }
  };

  const clearRoute = async () => {
    if (!window.confirm("Delete all waypoints?")) return;
    try {
      await api.delete("/waypoints");
      setWaypoints([]);
    } catch (err) {
      console.error("Clear failed:", err);
      alert("Failed to clear route");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", paddingTop: "80px" }}>
      {/* Sidebar */}
      <aside style={{ width: "300px", padding: "20px", background: "#0f172a", color: "white", zIndex: 500, overflowY: "auto" }}>
        <h2>📍 Route Planner</h2>
        
        <div style={{ marginBottom: 20, fontSize: 14, color: user ? '#4ade80' : '#f87171' }}>
           {user ? `● Logged in as ${user.email}` : "● Guest Mode (Read Only)"}
        </div>
        
        {user && (
          <button 
            onClick={clearRoute} 
            style={{ 
              background: "#dc2626", 
              color: "white", 
              padding: "10px", 
              width: "100%", 
              border: "none", 
              borderRadius: 6, 
              cursor: "pointer", 
              marginBottom: 20,
              fontWeight: "bold"
            }}
          >
            Clear Route
          </button>
        )}

        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {waypoints.length === 0 && <p style={{opacity: 0.5, fontSize: 13}}>No waypoints set.</p>}
          {waypoints.map((wp, i) => (
            <div key={wp._id || i} style={{ padding: 10, background: '#1e293b', marginBottom: 8, borderRadius: 6, fontSize: 13 }}>
              <b>WP{i+1}</b>: {Number(wp.lat).toFixed(5)}, {Number(wp.lng).toFixed(5)}
            </div>
          ))}
        </div>
      </aside>

      {/* Map Container */}
      <MapContainer center={[userPosition.lat, userPosition.lng]} zoom={18} style={{ flex: 1, height: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapView 
          waypoints={waypoints} 
          roverPosition={roverPosition} 
          userPosition={userPosition} 
          onAdd={handleAddWaypoint}
        />
      </MapContainer>
    </div>
  );
}