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

  // 3. 🚗 Poll Rover Position + connection / ping
  useEffect(() => {
    const interval = setInterval(async () => {
      const startedAt = performance.now();
      try {
        const res = await api.get("/rover/gps");
        if (res.data && typeof res.data.lat === "number") {
          setRoverPosition(res.data);
          setRoverConnected(true);
          setRoverStatus("Connected");
          if (res.data.ip) setRoverIp(res.data.ip);

          const rtt = Math.round(performance.now() - startedAt);
          setPingMs(rtt);
        }
      } catch (e) {
        setRoverConnected(false);
        setRoverStatus("Disconnected");
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
    <div style={{ paddingTop: "80px" }}>
      <div className="planner-container">
        {/* Map Container */}
        <div className="map-container">
          {!mapReady && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                zIndex: 5,
              }}
            >
              Loading map...
            </div>
          )}

          {/* Waypoint / Rover control panel (overlay card) */}
          <div className="planner-panel">
            <div className="planner-panel-header">
              <span>Waypoint List</span>
              <div className="planner-panel-header-icons">
                <span>📡</span>
                <span>🛰️</span>
              </div>
            </div>

            <div className="planner-panel-body">
              <div className="planner-panel-subheader">
                <span>Waypoints</span>
                <span className="badge">{waypoints.length}</span>
              </div>

              <div className="planner-waypoint-list">
                {waypoints.length === 0 && (
                  <p className="planner-waypoint-empty">
                    👉 Click on the map to add waypoints
                  </p>
                )}
                {waypoints.map((wp, i) => {
                  const lat =
                    typeof wp.lat === "number" ? wp.lat : parseFloat(wp.lat);
                  const lng =
                    typeof wp.lng === "number" ? wp.lng : parseFloat(wp.lng);
                  const isValid = !isNaN(lat) && !isNaN(lng);

                  return (
                    <div key={wp._id || i} className="planner-waypoint-item">
                      <div className="planner-waypoint-dot">WP{i + 1}</div>
                      <div className="planner-waypoint-coords">
                        {isValid
                          ? `${lat.toFixed(5)}, ${lng.toFixed(5)}`
                          : "Invalid coordinates"}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="planner-panel-buttons">
                <button
                  className="btn-primary"
                  disabled={
                    waypoints.length === 0 || isSendingPath || !user || !roverConnected
                  }
                  onClick={async () => {
                    if (waypoints.length === 0) return;
                    setIsSendingPath(true);
                    setStatusMessage("⏳ Sending path to rover...");
                    try {
                      await api.post("/rover/path", { waypoints });
                      setStatusMessage("✅ Path sent to rover");
                      setRoverStatus("Path uploaded");
                    } catch (err) {
                      console.error("❌ Failed to send path:", err);
                      setStatusMessage("❌ Failed to send path to rover");
                    } finally {
                      setIsSendingPath(false);
                    }
                  }}
                >
                  {isSendingPath ? "Sending..." : "Send Path to Rover"}
                </button>

                <button
                  className="btn-success"
                  disabled={isStarting || !user}
                  onClick={async () => {
                    setIsStarting(true);
                    setStatusMessage("⏳ Starting navigation...");
                    try {
                      await api.post("/rover/start");
                      setStatusMessage("✅ Rover navigation started");
                      setRoverStatus("Navigating");
                    } catch (err) {
                      console.error("❌ Failed to start rover:", err);
                      setStatusMessage("❌ Failed to start rover");
                    } finally {
                      setIsStarting(false);
                    }
                  }}
                >
                  {isStarting ? "Starting..." : "Start Navigation"}
                </button>

                <button
                  className="btn-danger"
                  disabled={isStopping || !user}
                  onClick={async () => {
                    setIsStopping(true);
                    setStatusMessage("⏳ Stopping rover...");
                    try {
                      await api.post("/rover/stop");
                      setStatusMessage("✅ Rover stopped");
                      setRoverStatus("Stopped");
                    } catch (err) {
                      console.error("❌ Failed to stop rover:", err);
                      setStatusMessage("❌ Failed to stop rover");
                    } finally {
                      setIsStopping(false);
                    }
                  }}
                >
                  {isStopping ? "Stopping..." : "Stop Rover"}
                </button>

                {user && (
                  <button
                    className="btn-secondary"
                    disabled={isSaving || waypoints.length === 0}
                    onClick={clearRoute}
                  >
                    {isSaving ? "Clearing..." : "Clear All Waypoints"}
                  </button>
                )}
              </div>

              {statusMessage && (
                <div className="planner-status-message">{statusMessage}</div>
              )}
            </div>

            <div className="planner-panel-footer">
              <span>
                {roverConnected ? "🟢 Connected to Rover" : "🔴 Rover Offline"}
              </span>
              <span>
                IP: {roverIp || "—"} • Ping:{" "}
                {pingMs !== null ? `${pingMs}ms` : "—"}
              </span>
            </div>
          </div>

          <MapContainer
            key={`${userPosition.lat}-${userPosition.lng}`}
            center={[userPosition.lat, userPosition.lng]}
            zoom={18}
            style={{ width: "100%", height: "100%" }}
            className="map"
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
    </div>
  );
}
