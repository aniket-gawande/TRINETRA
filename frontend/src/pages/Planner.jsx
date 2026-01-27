import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import MapView from "../components/mapview";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "leaflet/dist/leaflet.css";
import "./Planner.css";

export default function Planner() {
  const { user } = useAuth();
  const [waypoints, setWaypoints] = useState([]);
  const [userPosition, setUserPosition] = useState({ lat: 18.6517, lng: 73.7615 });
  const [roverPosition, setRoverPosition] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  // 1. Load User Location
  useEffect(() => {
    console.log("🗺️ Planner component mounted");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          console.log("📍 User location obtained:", pos.coords);
        },
        (err) => {
          console.warn("⚠️ Location access denied or error:", err);
          // Keep default position
        }
      );
    }
  }, []);

  // 2. Load Existing Waypoints (Only if user is logged in)
  useEffect(() => {
    if (user) {
      console.log("👤 User found, loading waypoints...");
      api.get("/waypoints")
        .then((res) => {
          console.log("✅ Waypoints API response:", res.data);
          
          // Extract waypoints array - backend returns {success, waypoints: Array, count}
          const waypointsArray = res.data.waypoints || [];
          
          // Normalize waypoint data
          const normalizedWaypoints = waypointsArray.map(wp => ({
            _id: wp._id,
            lat: parseFloat(wp.lat),
            lng: parseFloat(wp.lng),
            order: wp.order,
            createdAt: wp.createdAt
          }));
          
          console.log("📦 Normalized waypoints:", normalizedWaypoints);
          setWaypoints(normalizedWaypoints);
          
          if (normalizedWaypoints.length > 0) {
            setStatusMessage(`✅ Loaded ${normalizedWaypoints.length} waypoint(s)`);
          }
        })
        .catch((err) => {
          console.error("❌ Failed to load waypoints:", err.message);
          setStatusMessage("❌ Failed to load waypoints");
          setWaypoints([]);
        });
    }
  }, [user]);

  // 3. 🚗 Poll Rover Position
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await api.get("/rover/gps");
        if (res.data && typeof res.data.lat === "number") {
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

    if (!latlng || typeof latlng.lat !== "number" || typeof latlng.lng !== "number") {
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
      const res = await api.post("/waypoints", newPoint);
      console.log("✅ Waypoint saved response:", res.data);

      // Extract waypoint from response - backend returns {success, message, waypoint: {...}}
      const savedWaypoint = res.data.waypoint || res.data;
      
      // Normalize the waypoint data
      const normalizedWaypoint = {
        _id: savedWaypoint._id,
        lat: parseFloat(savedWaypoint.lat),
        lng: parseFloat(savedWaypoint.lng),
        order: savedWaypoint.order,
        createdAt: savedWaypoint.createdAt
      };

      console.log("✅ Adding normalized waypoint:", normalizedWaypoint);
      
      const updatedWaypoints = [...waypoints, normalizedWaypoint];
      setWaypoints(updatedWaypoints);

      setStatusMessage(`✅ Waypoint ${updatedWaypoints.length} saved! (${normalizedWaypoint.lat.toFixed(5)}, ${normalizedWaypoint.lng.toFixed(5)})`);
      setTimeout(() => setStatusMessage(""), 3000);
    } catch (err) {
      console.error("❌ Save Failed:", err);
      const msg = err.response?.data?.error || "Could not save waypoint.";
      setStatusMessage(`❌ Error: ${msg}`);
    } finally {
      setIsSaving(false);
    }
  };

  const clearRoute = async () => {
    if (!window.confirm("⚠️ Delete all waypoints?")) return;
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
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="planner-container">
      {/* Sidebar */}
      <aside className="planner-sidebar">
        <h2>📍 Route Planner</h2>

        <div style={{ marginBottom: 20, fontSize: 14, color: user ? "#4ade80" : "#f87171" }}>
          {user ? `● Logged in as ${user.email}` : "● Guest Mode (Read Only)"}
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div
            style={{
              marginBottom: 15,
              padding: 12,
              background: statusMessage.includes("✅")
                ? "#166534"
                : statusMessage.includes("❌")
                  ? "#7f1d1d"
                  : "#1e40af",
              borderRadius: 6,
              fontSize: 12,
              borderLeft:
                "4px solid " +
                (statusMessage.includes("✅")
                  ? "#22c55e"
                  : statusMessage.includes("❌")
                    ? "#ef4444"
                    : "#3b82f6"),
            }}
          >
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
              fontWeight: "bold",
            }}
          >
            {isSaving ? "⏳ Processing..." : "Clear Route"}
          </button>
        )}

        {/* Waypoints List */}
        <div style={{ marginBottom: 15, fontSize: 13, color: "#94a3b8", fontWeight: "bold" }}>
          📌 Waypoints: {waypoints.length}
        </div>

        <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
          {waypoints.length === 0 && (
            <p style={{ opacity: 0.5, fontSize: 13 }}>👉 Click on the map to add waypoints</p>
          )}
          {waypoints.map((wp, i) => {
            // Safely parse coordinates
            const lat = typeof wp.lat === 'number' ? wp.lat : parseFloat(wp.lat);
            const lng = typeof wp.lng === 'number' ? wp.lng : parseFloat(wp.lng);
            const isValid = !isNaN(lat) && !isNaN(lng);
            
            return (
              <div
                key={wp._id || i}
                style={{
                  padding: 10,
                  background: "#1e293b",
                  marginBottom: 8,
                  borderRadius: 6,
                  fontSize: 12,
                  border: "1px solid #334155",
                  opacity: isValid ? 1 : 0.5
                }}
              >
                <div style={{ color: "#2563eb", fontWeight: "bold", marginBottom: 4 }}>WP{i + 1}</div>
                <div style={{ fontSize: 11, color: "#cbd5e1" }}>
                  🔴 {isValid ? `${lat.toFixed(5)}, ${lng.toFixed(5)}` : "Invalid coordinates"}
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Map Container */}
      <div className="map-wrapper">
        {!mapReady && (
          <div style={{ 
            position: "absolute", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)", 
            color: "white",
            zIndex: 10
          }}>
            Loading map...
          </div>
        )}
        
        <MapContainer
          key={`${userPosition.lat}-${userPosition.lng}`}
          center={[userPosition.lat, userPosition.lng]}
          zoom={18}
          style={{ width: "100%", height: "100%" }}
          className="map-container"
          whenCreated={(map) => {
            console.log("🗺️ Map created, initializing...");
            setTimeout(() => {
              map.invalidateSize();
              setMapReady(true);
              console.log("✅ Map ready!");
            }, 300);
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
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
