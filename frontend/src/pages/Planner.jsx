import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import MapView from "../components/mapview";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "leaflet/dist/leaflet.css";
import "./planner.css";

export default function Planner() {
  const { user } = useAuth();
  const [waypoints, setWaypoints] = useState([]);
  const [userPosition, setUserPosition] = useState(null); // start null so we know when got it
  const [roverPosition, setRoverPosition] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Dual Mode: 'waypoints' or 'manual'
  const [mode, setMode] = useState('waypoints');

  // Load User Location (Run once)
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => setUserPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.warn("Location error:", err),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // Load Waypoints
  useEffect(() => {
    if (user) {
      api.get("/waypoints")
        .then((res) => {
          const waypointsArray = res.data.waypoints || [];
          const normalized = waypointsArray.map(wp => ({
            _id: wp._id, lat: parseFloat(wp.lat), lng: parseFloat(wp.lng), order: wp.order
          }));
          setWaypoints(normalized);
          if (normalized.length > 0) setStatusMessage(`✅ Loaded ${normalized.length} waypoints`);
        })
        .catch(() => setWaypoints([]));
    }
  }, [user]);

  // Handle map click
  const handleAddWaypoint = async (latlng) => {
    if (mode !== 'waypoints') return; // Only add if in waypoint mode
    
    setIsSaving(true);
    setStatusMessage("⏳ Adding waypoint...");
    
    try {
      const newPoint = { lat: parseFloat(latlng.lat), lng: parseFloat(latlng.lng), order: waypoints.length + 1 };
      
      if (user) {
        const res = await api.post("/waypoints", newPoint);
        const saved = res.data.waypoint || res.data;
        setWaypoints([...waypoints, { ...saved, lat: parseFloat(saved.lat), lng: parseFloat(saved.lng) }]);
      } else {
        setWaypoints([...waypoints, { ...newPoint, _id: Date.now() }]);
      }
      setStatusMessage(`✅ Waypoint added!`);
    } catch (err) {
      setWaypoints([...waypoints, { lat: parseFloat(latlng.lat), lng: parseFloat(latlng.lng), order: waypoints.length + 1, _id: Date.now() }]);
      setStatusMessage("⚠️ Saved locally (login to sync)");
    } finally {
      setIsSaving(false);
    }
  };

  const clearRoute = async () => {
    if (!window.confirm("Delete all waypoints?")) return;
    try {
      if (user) await api.delete("/waypoints");
      setWaypoints([]);
      setStatusMessage("🗑️ Route cleared");
    } catch (err) {
      setWaypoints([]);
      setStatusMessage("🗑️ Route cleared locally");
    }
  };

  const handleManualCommand = (direction) => {
    setStatusMessage(`🚀 Manual Command: ${direction}`);
    // api.post('/rover/command', { command: direction }).catch(e => console.error(e));
  };

  return (
    <div style={{ paddingTop: "72px" }}>
      <div className="planner-container">
        
        {/* Toggle Button for Mobile */}
        <button className="sidebar-toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? '✕' : '☰'}
        </button>
        
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <h2>Mission Control</h2>
            <div className="mode-selector">
              <button 
                className={`mode-btn ${mode === 'waypoints' ? 'active' : ''}`} 
                onClick={() => setMode('waypoints')}
              >
                📍 Waypoints
              </button>
              <button 
                className={`mode-btn ${mode === 'manual' ? 'active' : ''}`} 
                onClick={() => setMode('manual')}
              >
                🎮 Manual
              </button>
            </div>
          </div>

          <div className="sidebar-content">
            {mode === 'waypoints' ? (
              // WAYPOINTS SECTION
              <>
                <div style={{ padding: '0 1.5rem', marginBottom: '1rem' }}>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                    Tap on the map to place markers. Your rover will follow this path.
                  </p>
                </div>
                
                {waypoints.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">🗺️</div>
                    <p>No waypoints defined</p>
                    <small>Click on the map to start</small>
                  </div>
                ) : (
                  <div className="waypoint-list-container">
                    {waypoints.map((wp, i) => (
                      <div key={i} className="waypoint-card">
                        <div className="wp-header">
                          <div className="wp-badge">{i + 1}</div>
                          <h3>Waypoint</h3>
                          <span className="wp-status">Pending</span>
                        </div>
                        <div className="waypoint-coords">
                          <div><span className="coord-label">LAT</span> {wp.lat.toFixed(6)}</div>
                          <div><span className="coord-label">LNG</span> {wp.lng.toFixed(6)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              // MANUAL CONTROLS SECTION
              <div className="manual-control-section">
                <p className="manual-desc">Take direct control of the rover. Use the D-Pad to move.</p>
                
                <div className="d-pad-container">
                  <div className="d-pad-row top">
                    <button className="d-pad-btn up" onClick={() => handleManualCommand('FORWARD')}
                      onMouseDown={(e) => { e.currentTarget.classList.add('active'); }}
                      onMouseUp={(e) => { e.currentTarget.classList.remove('active'); handleManualCommand('STOP'); }}
                      onMouseLeave={(e) => { e.currentTarget.classList.remove('active'); }}
                      onTouchStart={(e) => { e.currentTarget.classList.add('active'); handleManualCommand('FORWARD'); }}
                      onTouchEnd={(e) => { e.currentTarget.classList.remove('active'); handleManualCommand('STOP'); }}
                    >
                      ▲
                    </button>
                  </div>
                  <div className="d-pad-row middle">
                    <button className="d-pad-btn left" onClick={() => handleManualCommand('LEFT')}
                      onMouseDown={(e) => { e.currentTarget.classList.add('active'); }}
                      onMouseUp={(e) => { e.currentTarget.classList.remove('active'); handleManualCommand('STOP'); }}
                      onMouseLeave={(e) => { e.currentTarget.classList.remove('active'); }}
                      onTouchStart={(e) => { e.currentTarget.classList.add('active'); handleManualCommand('LEFT'); }}
                      onTouchEnd={(e) => { e.currentTarget.classList.remove('active'); handleManualCommand('STOP'); }}
                    >
                      ◀
                    </button>
                    <div className="d-pad-center"></div>
                    <button className="d-pad-btn right" onClick={() => handleManualCommand('RIGHT')}
                      onMouseDown={(e) => { e.currentTarget.classList.add('active'); }}
                      onMouseUp={(e) => { e.currentTarget.classList.remove('active'); handleManualCommand('STOP'); }}
                      onMouseLeave={(e) => { e.currentTarget.classList.remove('active'); }}
                      onTouchStart={(e) => { e.currentTarget.classList.add('active'); handleManualCommand('RIGHT'); }}
                      onTouchEnd={(e) => { e.currentTarget.classList.remove('active'); handleManualCommand('STOP'); }}
                    >
                      ▶
                    </button>
                  </div>
                  <div className="d-pad-row bottom">
                    <button className="d-pad-btn down" onClick={() => handleManualCommand('BACKWARD')}
                      onMouseDown={(e) => { e.currentTarget.classList.add('active'); }}
                      onMouseUp={(e) => { e.currentTarget.classList.remove('active'); handleManualCommand('STOP'); }}
                      onMouseLeave={(e) => { e.currentTarget.classList.remove('active'); }}
                      onTouchStart={(e) => { e.currentTarget.classList.add('active'); handleManualCommand('BACKWARD'); }}
                      onTouchEnd={(e) => { e.currentTarget.classList.remove('active'); handleManualCommand('STOP'); }}
                    >
                      ▼
                    </button>
                  </div>
                </div>
                
                <button className="btn-stop" onClick={() => handleManualCommand('STOP')}>
                  EMERGENCY STOP
                </button>
              </div>
            )}
          </div>

          <div className="sidebar-footer">
            {statusMessage && <div className="status-toast">{statusMessage}</div>}
            
            {mode === 'waypoints' && (
              <div className="action-buttons">
                <button className="btn-secondary" onClick={clearRoute} disabled={waypoints.length === 0}>
                  Clear Route
                </button>
                <button className="btn-primary" disabled={waypoints.length === 0}>
                  Start Mission
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Mobile Overlay */}
        <div className={`mobile-overlay ${isSidebarOpen ? 'visible' : ''}`} onClick={() => setIsSidebarOpen(false)} />

        {/* Map Area */}
        <div className="map-area">
          <MapContainer
            center={userPosition || [18.6517, 73.7615]}
            zoom={18}
            className="leaflet-map"
            zoomControl={false}
          >
            {/* Dark premium tile layer */}
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            <MapView
              waypoints={waypoints}
              roverPosition={roverPosition}
              userPosition={userPosition}
              mode={mode}
              onAdd={handleAddWaypoint}
            />
          </MapContainer>
        </div>

      </div>
    </div>
  );
}