import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import MapView from "../components/MapView";
import { api } from "../services/api";

export default function Planner() {
  const [waypoints, setWaypoints] = useState([]);
  const [userPosition, setUserPosition] = useState(null);
  const [roverPosition, setRoverPosition] = useState(null);

  /* 📡 GET USER GPS LOCATION */
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        setUserPosition(location);
        setRoverPosition(location); // rover starts here
      },
      () => alert("Please allow location access"),
      { enableHighAccuracy: true }
    );
  }, []);

  /* 🚗 SIMULATED ROVER MOVEMENT */
  useEffect(() => {
    if (!roverPosition) return;

    const interval = setInterval(() => {
      setRoverPosition((prev) => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.0005,
        lng: prev.lng + (Math.random() - 0.5) * 0.0005,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [roverPosition]);

  /* ➕ ADD WAYPOINT */
  const handleAddWaypoint = async (point) => {
    try {
      const res = await api.post("/waypoints", {
        lat: point.lat,
        lng: point.lng,
        order: waypoints.length + 1,
      });

      setWaypoints((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Failed to save waypoint", err);
      alert("Failed to save waypoint");
    }
  };

  /* ❌ CLEAR ROUTE */
  const clearRoute = async () => {
    try {
      await api.delete("/waypoints");
      setWaypoints([]);
    } catch (err) {
      console.error("Failed to clear route", err);
      alert("Failed to clear route");
    }
  };

  if (!userPosition) {
    return (
      <div style={{ padding: 40, fontSize: 18 }}>
        📡 Detecting your location…
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", display: "flex" }}>
      {/* 🗺 MAP */}
      <div style={{ width: "70%", height: "100%" }}>
        <MapContainer
          center={[userPosition.lat, userPosition.lng]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
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

      {/* 📊 SIDE PANEL */}
      <div style={sidePanelStyle}>
        <h3 style={{ marginBottom: 12 }}>📍 Waypoints</h3>

        {waypoints.length === 0 && (
          <p style={{ opacity: 0.6 }}>
            Click on the map to add waypoints
          </p>
        )}

        {waypoints.map((wp, i) => (
          <div key={i} style={waypointCard}>
            <b>WP {i + 1}</b>
            <div>Lat: {wp.lat.toFixed(5)}</div>
            <div>Lng: {wp.lng.toFixed(5)}</div>
          </div>
        ))}

        <button onClick={clearRoute} style={clearBtn}>
          Clear Route
        </button>
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const sidePanelStyle = {
  width: "30%",
  background: "#020617",
  color: "white",
  padding: "20px",
  overflowY: "auto",
};

const waypointCard = {
  border: "1px solid #2563eb",
  borderRadius: "8px",
  padding: "10px",
  marginBottom: "10px",
};

const clearBtn = {
  marginTop: "20px",
  width: "100%",
  padding: "12px",
  background: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
