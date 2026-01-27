import { Marker, Polyline, Popup, useMapEvents, useMap, Circle } from "react-leaflet";
import L from "leaflet";
import { useEffect, useRef } from "react";

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

/* 🔄 SMART RE-CENTER (Fixes Shivering) */
function RecenterMap({ position }) {
  const map = useMap();
  const hasCentered = useRef(false); // Track if we have already centered once

  useEffect(() => {
    // Only fly to user position on INITIAL load, then let user pan freely
    if (position && !hasCentered.current) {
      map.flyTo([position.lat, position.lng], 18, { animate: true, duration: 1.5 });
      hasCentered.current = true; 
    }
  }, [position, map]);

  return null;
}

export default function MapView({ waypoints, roverPosition, userPosition, onAdd }) {
  
  // 🖱️ CLICK LISTENER
  useMapEvents({
    click(e) {
      // Prevent rapid double-clicks from causing issues
      onAdd(e.latlng); 
    },
  });

  return (
    <>
      {/* 🚀 Only centers once on load */}
      {userPosition && <RecenterMap position={userPosition} />}

      {/* 👤 User Location */}
      {userPosition && (
        <>
          <Marker position={[userPosition.lat, userPosition.lng]} icon={userIcon}>
            <Popup>You</Popup>
          </Marker>
          <Circle 
            center={[userPosition.lat, userPosition.lng]} 
            radius={10} 
            pathOptions={{ color: '#2563eb', fillColor: '#2563eb', fillOpacity: 0.1 }} 
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
      {waypoints.map((wp, i) => (
        <Marker key={wp._id || i} position={[wp.lat, wp.lng]} icon={createWaypointIcon(i + 1)}>
          <Popup>Waypoint {i + 1}</Popup>
        </Marker>
      ))}

      {/* ➖ Route Line */}
      {waypoints.length > 1 && (
        <Polyline positions={waypoints.map((wp) => [wp.lat, wp.lng])} pathOptions={{ color: "#2563eb", weight: 4, dashArray: '5, 10' }} />
      )}
    </>
  );
}