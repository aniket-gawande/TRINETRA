import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import MapView from "../components/MapView";
import { api } from "../services/api";
import "leaflet/dist/leaflet.css";

export default function Planner() {
  const [waypoints, setWaypoints] = useState([]);
  const [userPosition, setUserPosition] = useState(null);
  const [roverPosition, setRoverPosition] = useState(null);

  /* 📍 USER LOCATION (MAP CENTER ONLY) */
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => alert("Please allow location access"),
      { enableHighAccuracy: true }
    );
  }, []);

  /* 🚗 FETCH ROVER GPS (BACKEND → ESP32) */
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await api.get("/rover/location");
        if (res.data?.lat && res.data?.lng) {
          setRoverPosition(res.data);
        }
      } catch {
        setRoverPosition(null);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  /* ➕ ADD WAYPOINT */
  const handleAddWaypoint = async (point) => {
    try {
      const res = await api.post("/waypoints", {
        lat: point.lat,
        lng: point.lng,
        order: waypoints.length + 1,
      });

      setWaypoints((prev) => [...prev, res.data]);
    } catch {
      alert("Failed to save waypoint");
    }
  };

  /* ❌ CLEAR ROUTE */
  const clearRoute = async () => {
    try {
      await api.delete("/waypoints");
      setWaypoints([]);
    } catch {
      alert("Failed to clear route");
    }
  };

  if (!userPosition) {
    return <div style={{ padding: 40 }}>📡 Detecting your location…</div>;
  }

  return (
    <div style={styles.page}>
      {/* 🧭 SIDEBAR */}
      <aside style={styles.sidebar}>
        <h2 style={styles.title}>📍 Waypoints</h2>

        <div style={styles.list}>
          {waypoints.length === 0 && (
            <p style={styles.muted}>Click on the map to add waypoints</p>
          )}

          {waypoints.map((wp, i) => (
            <div key={wp._id || i} style={styles.card}>
              <b>WP {i + 1}</b>
              <div>Lat: {wp.lat.toFixed(5)}</div>
              <div>Lng: {wp.lng.toFixed(5)}</div>
            </div>
          ))}
        </div>

        <button onClick={clearRoute} style={styles.clearBtn}>
          Clear Route
        </button>

        <div style={styles.status}>
          Rover Status:{" "}
          {roverPosition ? "🟢 Online" : "🔴 Offline"}
        </div>
      </aside>

      {/* 🗺 MAP */}
      <main style={styles.mapWrapper}>
        <MapContainer
          center={[userPosition.lat, userPosition.lng]}
          zoom={15}
          style={styles.map}
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
      </main>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  page: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    background: "#020617",
  },
  sidebar: {
    width: "300px",
    minWidth: "300px",
    background: "#020617",
    color: "white",
    padding: "20px",
    borderRight: "1px solid #1e293b",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginBottom: "20px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  list: {
    flex: 1,
    overflowY: "auto",
    marginBottom: "20px",
  },
  muted: {
    opacity: 0.6,
    fontSize: "14px",
  },
  card: {
    border: "1px solid #2563eb",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "14px",
    background: "#020617",
  },
  clearBtn: {
    padding: "12px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  status: {
    fontSize: "12px",
    opacity: 0.7,
    textAlign: "center",
  },
  mapWrapper: {
    flex: 1,
    height: "100vh",
    overflow: "hidden",
    background: "#000",
  },
  map: {
    height: "100%",
    width: "100%",
  },
};
