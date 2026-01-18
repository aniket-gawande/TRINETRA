import {
  Marker,
  Polyline,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { generateSensorData } from "../utils/fakeSensorData";

/* ICONS */
const roverIcon = L.divIcon({ html: "🚗", iconSize: [30, 30] });
const userIcon = L.divIcon({ html: "🔵", iconSize: [20, 20] });

function createNumberedIcon(number) {
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
      border:2px solid white;
    ">${number}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

/* 📍 GOOGLE-STYLE LOCATE BUTTON */
function LocateButton({ userPosition }) {
  const map = useMap();

  if (!userPosition) return null;

  return (
    <button
      onClick={() =>
        map.setView([userPosition.lat, userPosition.lng], 16)
      }
      style={{
        position: "absolute",
        bottom: 20,
        right: 20,
        zIndex: 1000,
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: "1px solid #ccc",
        background: "white",
        cursor: "pointer",
        fontSize: 20,
      }}
      title="My Location"
    >
      📍
    </button>
  );
}

export default function MapView({
  waypoints,
  onAdd,
  roverPosition,
  userPosition,
}) {
  useMapEvents({
    click(e) {
      onAdd({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return (
    <>
      <LocateButton userPosition={userPosition} />

      {userPosition && (
        <Marker position={[userPosition.lat, userPosition.lng]} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {roverPosition && (
        <Marker
          position={[roverPosition.lat, roverPosition.lng]}
          icon={roverIcon}
        >
          <Popup>🚗 Rover Live</Popup>
        </Marker>
      )}

      {waypoints.map((wp, i) => {
        const sensor = generateSensorData();

        return (
          <Marker
            key={i}
            position={[wp.lat, wp.lng]}
            icon={createNumberedIcon(i + 1)}
          >
            <Popup>
              <b>Waypoint {i + 1}</b>
              <br />
              AQI: {sensor.aqi}
              <br />
              Temp: {sensor.temperature}°C
              <br />
              Humidity: {sensor.humidity}%
            </Popup>
          </Marker>
        );
      })}

      {waypoints.length > 1 && (
        <Polyline positions={waypoints.map((wp) => [wp.lat, wp.lng])} />
      )}
    </>
  );
}
