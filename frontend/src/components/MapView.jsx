import { Marker, Polyline, Popup, useMapEvents, useMap, Circle, CircleMarker } from "react-leaflet";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";

/* 📍 Premium Attractive Waypoint Icon */
function createWaypointIcon(n) {
  return L.divIcon({
    html: `
      <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; inset: -4px; background: rgba(16, 185, 129, 0.4); border-radius: 50%; animation: pulse-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
        <div style="position: relative; background: linear-gradient(135deg, #10b981, #059669); color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; border: 2px solid white; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.5); font-family: 'Inter', sans-serif;">
          ${n}
        </div>
        <div style="position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); width: 2px; height: 10px; background: #059669; z-index: -1;"></div>
        <div style="position: absolute; bottom: -12px; left: 50%; transform: translateX(-50%); width: 8px; height: 4px; background: rgba(0,0,0,0.4); border-radius: 50%; filter: blur(1px); z-index: -2;"></div>
      </div>
      <style>
        @keyframes pulse-ping {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      </style>
    `,
    className: "premium-waypoint-icon",
    iconSize: [36, 48],
    iconAnchor: [18, 48],
    popupAnchor: [0, -48]
  });
}

const roverIcon = L.divIcon({
  html: `<div style="background: linear-gradient(135deg, #f59e0b, #d97706); font-size: 20px; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 8px; border: 2px solid white; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);">🤖</div>`,
  className: "rover-icon",
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

export default function MapView({ waypoints, roverPosition, userPosition, mode, onAdd }) {
  const map = useMap();
  const hasCentered = useRef(false);

  // 🔄 Auto-center on user ONLY ONCE when location is found
  useEffect(() => {
    if (userPosition && !hasCentered.current) {
      map.flyTo([userPosition.lat, userPosition.lng], 18, { animate: true, duration: 2 });
      hasCentered.current = true; 
    }
  }, [userPosition, map]);

  // Use Leaflet's built in locate on mount for immediate center even before React state catches up
  useEffect(() => {
    if (!hasCentered.current) {
      map.locate({ setView: true, maxZoom: 18, enableHighAccuracy: true });
      map.once('locationfound', (e) => {
        if (!hasCentered.current) {
          map.flyTo(e.latlng, 18, { animate: true, duration: 1.5 });
          hasCentered.current = true;
        }
      });
    }
  }, [map]);

  // 🖱️ SMART CLICK LISTENER
  useMapEvents({
    click(e) {
      if (mode === 'waypoints') {
        onAdd(e.latlng);
      }
    },
  });

  return (
    <>
      {/* 👤 User Premium Location Pin */}
      {userPosition && (
        <>
          <CircleMarker 
            center={[userPosition.lat, userPosition.lng]} 
            radius={8}
            pathOptions={{ color: 'white', weight: 2, fillColor: '#3b82f6', fillOpacity: 1 }} 
          >
            <Popup>You are here</Popup>
          </CircleMarker>
          <Circle 
            center={[userPosition.lat, userPosition.lng]} 
            radius={30} 
            pathOptions={{ color: '#3b82f6', weight: 1, fillColor: '#3b82f6', fillOpacity: 0.15 }} 
          />
        </>
      )}

      {/* 🤖 Rover Location */}
      {roverPosition && (
        <Marker position={[roverPosition.lat, roverPosition.lng]} icon={roverIcon}>
          <Popup>Rover Active</Popup>
        </Marker>
      )}

      {/* 📍 Waypoints */}
      {waypoints.map((wp, i) => (
        <Marker key={wp._id || i} position={[wp.lat, wp.lng]} icon={createWaypointIcon(i + 1)}>
          <Popup>Target Point {i + 1}</Popup>
        </Marker>
      ))}

      {/* ➖ Animated Route Line */}
      {waypoints.length > 1 && (
        <Polyline 
          positions={waypoints.map((wp) => [wp.lat, wp.lng])} 
          pathOptions={{ 
            color: "#10b981", 
            weight: 4, 
            opacity: 0.8,
            dashArray: "10, 10",
            lineCap: "round",
            lineJoin: "round"
          }} 
          className="animated-path"
        />
      )}
      <style>{`
        .animated-path {
          animation: dash-flow 20s linear infinite;
        }
        @keyframes dash-flow {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </>
  );
}