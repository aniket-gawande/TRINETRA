import { Marker, Polyline, Popup, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

/* 🚗 ICONS */
const roverIcon = L.divIcon({
  html: "🚗",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const userIcon = L.divIcon({
  html: "📍",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

function createWaypointIcon(number) {
  return L.divIcon({
    html: `<div style="
      background:#2563eb;
      color:white;
      border-radius:50%;
      width:30px;
      height:30px;
      display:flex;
      align-items:center;
      justify-content:center;
      font-weight:bold;
      box-shadow:0 0 6px rgba(0,0,0,0.4);
    ">${number}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

/* 🔧 CRITICAL: MAP RESIZE FIX */
function MapResizer() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    window.addEventListener("resize", map.invalidateSize);
    return () => window.removeEventListener("resize", map.invalidateSize);
  }, [map]);

  return null;
}

export default function MapView({
  waypoints,
  roverPosition,
  userPosition,
  onAdd,
}) {
  useMapEvents({
    click(e) {
      onAdd({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return (
    <>
      <MapResizer />

      {userPosition && (
        <Marker
          position={[userPosition.lat, userPosition.lng]}
          icon={userIcon}
        >
          <Popup>You are here</Popup>
        </Marker>
      )}

      {roverPosition && (
        <Marker
          position={[roverPosition.lat, roverPosition.lng]}
          icon={roverIcon}
        >
          <Popup>Rover (Live GPS)</Popup>
        </Marker>
      )}

      {waypoints.map((wp, i) => (
        <Marker
          key={wp._id || i}
          position={[wp.lat, wp.lng]}
          icon={createWaypointIcon(i + 1)}
        >
          <Popup>
            <b>Waypoint {i + 1}</b>
            <br />
            Lat: {wp.lat.toFixed(5)}
            <br />
            Lng: {wp.lng.toFixed(5)}
          </Popup>
        </Marker>
      ))}

      {waypoints.length > 1 && (
        <Polyline
          positions={waypoints.map((wp) => [wp.lat, wp.lng])}
          pathOptions={{ color: "#2563eb", weight: 4 }}
        />
      )}
    </>
  );
}
