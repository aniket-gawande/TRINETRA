export default function WaypointList({ waypoints }) {
  return (
    <div className="waypoint-panel">
      <h3>Waypoints</h3>
      {waypoints.map((wp, i) => (
        <div key={i}>
          WP{i + 1}: {wp.lat.toFixed(4)}, {wp.lng.toFixed(4)}
        </div>
      ))}
    </div>
  );
}
