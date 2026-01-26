import { Marker, Polyline, Popup, useMapEvents, useMap, Circle } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

/* 📍 ICONS */
const roverIcon = L.divIcon({
  html: "🤖",
  className: "custom-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const userIcon = L.divIcon({
  html: "📍",
  className: "custom-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function createWaypointIcon(n) {
  return L.divIcon({
    html: `<div style="background:#2563eb;color:white;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-weight:bold;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3);">${n}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

/* 🔄 AUTO-CENTER MAP */
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo([position.lat, position.lng], map.getZoom());
  }, [position, map]);
  return null;
}

/* 📏 RESIZE FIX (Prevents grey tiles) */
function MapResizer() {
  const map = useMap();
  useEffect(() => { setTimeout(() => { map.invalidateSize(); }, 500); }, [map]);
  return null;
}

export default function MapView({ waypoints, roverPosition, userPosition, onAdd }) {
  
  // 🖱️ CLICK LISTENER: Sends Lat/Lng to Parent
  useMapEvents({
    click(e) {
      onAdd(e.latlng); 
    },
  });

  // 🔍 Validate and convert waypoints data
  const validWaypoints = Array.isArray(waypoints) 
    ? waypoints.filter(wp => 
        wp && 
        typeof Number(wp.lat) === 'number' && 
        typeof Number(wp.lng) === 'number' &&
        !isNaN(Number(wp.lat)) &&
        !isNaN(Number(wp.lng))
      )
    : [];

  useEffect(() => {
    if (validWaypoints.length > 0) {
      console.log("✅ Valid waypoints to plot:", validWaypoints);
    }
  }, [validWaypoints]);

  return (
    <>
      <MapResizer />
      {userPosition && <RecenterMap position={userPosition} />}

      {/* 👤 User Location (10m Circle) */}
      {userPosition && (
        <>
          <Marker position={[userPosition.lat, userPosition.lng]} icon={userIcon}>
            <Popup>You</Popup>
          </Marker>
          <Circle 
            center={[userPosition.lat, userPosition.lng]} 
            radius={10} 
            pathOptions={{ color: '#2563eb', fillColor: '#2563eb', fillOpacity: 0.2 }} 
          />
        </>
      )}

      {/* 🤖 Rover Location */}
      {roverPosition && (
        <Marker position={[roverPosition.lat, roverPosition.lng]} icon={roverIcon}>
          <Popup>Rover</Popup>
        </Marker>
      )}

      {/* 📍 Waypoints */}
      {validWaypoints.length > 0 ? (
        validWaypoints.map((wp, i) => (
          <Marker 
            key={wp._id || i} 
            position={[Number(wp.lat), Number(wp.lng)]} 
            icon={createWaypointIcon(i + 1)}
          >
            <Popup>Waypoint {i + 1}: {Number(wp.lat).toFixed(5)}, {Number(wp.lng).toFixed(5)}</Popup>
          </Marker>
        ))
      ) : (
        <div style={{ display: 'none' }} />
      )}

      {/* ➖ Route Line */}
      {validWaypoints.length > 1 && (
        <Polyline 
          positions={validWaypoints.map((wp) => [Number(wp.lat), Number(wp.lng)])} 
          pathOptions={{ color: "#2563eb", weight: 4, dashArray: '5, 10' }} 
        />
      )}
    </>
  );
}