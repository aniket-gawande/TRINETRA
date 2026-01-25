import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import MapView from "../components/mapview";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "leaflet/dist/leaflet.css";

export default function Planner() {
  const { user } = useAuth();
  const [waypoints, setWaypoints] = useState([]);
  const [userPosition, setUserPosition] = useState({ lat: 18.6517, lng: 73.7615 }); // PCCOE Default
  const [roverPosition, setRoverPosition] = useState(null);

  // 1. Load User Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      });
    }
  }, []);

  // 2. Load Existing Waypoints
  useEffect(() => {
    if (user) {
      api.get("/waypoints")
        .then((res) => setWaypoints(res.data))
        .catch((err) => console.error("Load failed", err));
    }
  }, [user]);

  // 3. 🚗 Poll Rover Position
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await api.get("/rover/gps");
        if (res.data?.lat) setRoverPosition(res.data);
      } catch (e) { /* silent fail if offline */ }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // 4. 🖱️ HANDLE CLICK & SAVE
  const handleAddWaypoint = async (latlng) => {
    if (!user) {
      alert("Please login to mark waypoints");
      return;
    }

    try {
      const newPoint = {
        lat: latlng.lat,
        lng: latlng.lng,
        order: waypoints.length + 1,
      };

      // Save to Backend
      const res = await api.post("/waypoints", newPoint);
      
      // Update UI immediately
      setWaypoints([...waypoints, res.data]); 

    } catch (err) {
      console.error("❌ Failed to save waypoint", err);
      alert("Failed to save. Check backend console.");
    }
  };

  const clearRoute = async () => {
    if (!window.confirm("Delete all waypoints?")) return;
    try {
      await api.delete("/waypoints");
      setWaypoints([]);
    } catch {
      alert("Failed to clear route");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", paddingTop: "80px" }}>
      <aside style={{ width: "300px", padding: "20px", background: "#0f172a", color: "white", zIndex: 500 }}>
        <h2>📍 Route Planner</h2>
        <div style={{ marginBottom: 20, fontSize: 14, color: user ? '#4ade80' : '#f87171' }}>
           {user ? "● User Logged In" : "● Guest Mode (Read Only)"}
        </div>
        
        <button onClick={clearRoute} style={{ background: "#dc2626", color: "white", padding: "10px", width: "100%", border: "none", borderRadius: 6, cursor: "pointer", marginBottom: 20 }}>
          Clear Route
        </button>

        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {waypoints.map((wp, i) => (
            <div key={i} style={{ padding: 10, background: '#1e293b', marginBottom: 8, borderRadius: 6, fontSize: 13 }}>
              <b>WP{i+1}</b>: {Number(wp.lat).toFixed(5)}, {Number(wp.lng).toFixed(5)}
            </div>
          ))}
        </div>
      </aside>

      <MapContainer center={[userPosition.lat, userPosition.lng]} zoom={18} style={{ flex: 1 }}>
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