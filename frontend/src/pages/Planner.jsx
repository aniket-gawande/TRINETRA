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
          const [statusMessage, setStatusMessage] = useState(""); // ✅ For user feedback
  const [isSaving, setIsSaving] = useState(false); // ✅ Loading state

  // 1. Load User Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          console.log("📍 User location obtained:", pos.coords);
        },
        (err) => console.warn("⚠️  Location access denied or error:", err)
      );
    }
  }, []);

  // 2. Load Existing Waypoints (Only if user is logged in)
  useEffect(() => {
    if (user) {
      api.get("/waypoints")
        .then((res) => {
          console.log("✅ Waypoints loaded:", res.data);
          setWaypoints(res.data);
          if (res.data.length > 0) {
            setStatusMessage(`✅ Loaded ${res.data.length} waypoint(s)`);
          }
        })
        .catch((err) => {
          console.error("❌ Failed to load waypoints:", err);
          setStatusMessage("❌ Failed to load waypoints");
        });
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
      alert("❌ Please login to mark waypoints");
      return;
    }

    // Validate Data
    if (!latlng || typeof latlng.lat !== 'number' || typeof latlng.lng !== 'number') {
      console.error("❌ Invalid LatLng data:", latlng);
      setStatusMessage("❌ Invalid location data");
      return;
    }

    setIsSaving(true);
    setStatusMessage("⏳ Saving waypoint...");

    try {
      const newPoint = {
        lat: latlng.lat,
        lng: latlng.lng,
        order: waypoints.length + 1,
      };

      console.log("📍 Saving Waypoint:", newPoint);

      // Save to Backend
      const res = await api.post("/waypoints", newPoint);
      
      console.log("✅ Waypoint saved successfully:", res.data);
      
      // Update UI immediately
      const updatedWaypoints = [...waypoints, res.data];
      setWaypoints(updatedWaypoints);
      
      setStatusMessage(`✅ Waypoint ${updatedWaypoints.length} saved! (${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)})`);
      
      // Clear message after 3 seconds
      setTimeout(() => setStatusMessage(""), 3000);

    } catch (err) {
      console.error("❌ Save Failed:", err);
      // Extract specific error message from backend response if available
      const msg = err.response?.data?.message || err.response?.data?.error || "Could not save waypoint.";
      setStatusMessage(`❌ Error: ${msg}`);
      alert(`Error: ${msg}`);
    } finally {
      setIsSaving(false);
    }
  };

  const clearRoute = async () => {
    if (!window.confirm("⚠️  Delete all waypoints?")) return;
    setIsSaving(true);
    setStatusMessage("⏳ Clearing route...");
    
    try {
      await api.delete("/waypoints");
      setWaypoints([]);
      setStatusMessage("✅ Route cleared!");
      setTimeout(() => setStatusMessage(""), 2000);
    } catch (err) {
      console.error("❌ Clear failed:", err);
      setStatusMessage("❌ Failed to clear route");
      alert("Failed to clear route");
    } finally {
      setIsSaving(false);
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

        {/* ✅ Status Message */}
        {statusMessage && (
          <div style={{ 
            marginBottom: 15, 
            padding: 12, 
            background: statusMessage.includes('✅') ? '#166534' : statusMessage.includes('❌') ? '#7f1d1d' : '#1e40af',
            borderRadius: 6,
            fontSize: 12,
            borderLeft: '4px solid ' + (statusMessage.includes('✅') ? '#22c55e' : statusMessage.includes('❌') ? '#ef4444' : '#3b82f6')
          }}>
            {statusMessage}
          </div>
        )}
        
        {user && (
          <button 
            onClick={clearRoute}
            disabled={isSaving || waypoints.length === 0}
            style={{ 
              background: isSaving || waypoints.length === 0 ? "#555" : "#dc2626", 
              color: "white", 
              padding: "10px", 
              width: "100%", 
              border: "none", 
              borderRadius: 6, 
              cursor: isSaving || waypoints.length === 0 ? "not-allowed" : "pointer", 
              marginBottom: 20,
              fontWeight: "bold"
            }}
          >
            {isSaving ? "⏳ Processing..." : "Clear Route"}
          </button>
        )}

        {/* Waypoints List */}
        <div style={{ 
          marginBottom: 15, 
          fontSize: 13, 
          color: '#94a3b8',
          fontWeight: 'bold'
        }}>
          📌 Waypoints: {waypoints.length}
        </div>

        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {waypoints.length === 0 && <p style={{opacity: 0.5, fontSize: 13}}>👉 Click on the map to add waypoints</p>}
          {waypoints.map((wp, i) => (
            <div key={wp._id || i} style={{ 
              padding: 10, 
              background: '#1e293b', 
              marginBottom: 8, 
              borderRadius: 6, 
              fontSize: 12,
              border: '1px solid #334155'
            }}>
              <div style={{ color: '#2563eb', fontWeight: 'bold', marginBottom: 4 }}>WP{i+1}</div>
              <div style={{ fontSize: 11, color: '#cbd5e1' }}>
                🔴 {Number(wp.lat).toFixed(5)}, {Number(wp.lng).toFixed(5)}
              </div>
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