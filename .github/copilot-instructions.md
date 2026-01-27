# TRINETRA Copilot Instructions

## Project Overview

**TRINETRA** is a **climate monitoring and GPS-based rover navigation platform** built on the MERN stack. The system combines real-time sensor data, interactive maps, and Bluetooth-based rover control for smart-city and disaster-management applications.

### Architecture Highlights
- **Backend**: Node.js/Express with MongoDB
- **Frontend**: React 19 + Vite with React Router
- **Real-time**: Bluetooth serial communication (SerialPort v12)
- **Authentication**: Firebase Auth + custom JWT middleware
- **Data**: MongoDB with models for Rover, RoverImage, OfflineData, Sensors, Waypoints

---

## Critical Developer Workflows

### Setup & Running
```bash
# Backend (Terminal 1)
cd backend && npm install && npm start
# Runs on http://localhost:5000/api

# Frontend (Terminal 2)  
cd frontend && npm install && npm run dev
# Runs on http://localhost:5173
```

**Environment Variables** (backend `.env`):
- `MONGO_URI` - MongoDB connection string (required)
- `BLUETOOTH_PORT` - Serial port (default: COM5; Linux: /dev/ttyUSB0)
- `BLUETOOTH_BAUD_RATE` - Serial baud rate (default: 115200)
- `PORT` - Backend port (default: 5000)
- Firebase credentials for admin operations

### Testing & Debugging
- **Frontend**: Uses Vite HMR; logs Bluetooth messages to browser console
- **Backend**: Check `server.js` startup logs for Bluetooth initialization status
- **Rover Data**: Parse incoming messages via `bluetoothHandler.parseRoverData()` 
- **Fake Data**: Use `src/utils/fakeSensorData.js`, `fakeAlerts.js`, `fakeAnalyticsData.js` for testing without hardware

---

## Key Architectural Patterns

### Bluetooth Communication Protocol
The rover sends JSON messages over serial with this format:
```
TYPE:DATA1,DATA2,DATA3
```

**Supported Types** (in `bluetoothHandler.js`):
- `GPS` - Location data (latitude, longitude, altitude)
- `SENSOR` - Environmental readings (temp, humidity, soil moisture, light)
- `STATUS` - Rover state (battery level, connection status, trip status)
- `ALERT` - Anomaly detection (high temp, low battery, obstacles)

**Critical**: Messages are parsed with `ReadlineParser` (delimiter: `\n`). Each message must end with newline.

### CORS & API Security
- **Allowed origins**: `http://localhost:5173`, `http://127.0.0.1:5173`
- **Auth middleware**: All rover/sensor endpoints require Firebase token in `Authorization: Bearer <token>` header
- **Response format**: `{ success: true, data: {...} }` or `{ error: "message" }`

### Frontend Data Flow
1. **AuthContext** (`src/context/AuthContext.jsx`) - Firebase auth state
2. **API Interceptor** (`src/services/api.js`) - Auto-adds Firebase token to requests
3. **Protected Routes** (`src/components/ProtectedRoute.jsx`) - Wraps authenticated pages
4. **Pages**: Home, Login, Signup, Dashboard (analytics), Planner (waypoints)

---

## Project-Specific Conventions

### Naming & Structure
- **Models**: Singular + Model suffix (`Rover.model.js`, not `rovers.model.js`)
- **Routes**: Plural (`rover.routes.js` → `/api/rover`)
- **Controllers**: Action-based naming (`auth.controller.js`)
- **Components**: PascalCase with `.jsx` extension

### Error Handling
- Backend: Log errors with emoji prefix (`✅`, `❌`, `⚠️`, `📡`) for console visibility
- Bluetooth errors don't crash server; catch in try/catch with retry logic
- Frontend: Use `api.interceptors.response` for 401 handling

### Database Design
- **Rover model** includes: `roverId`, GPS coords (lat/long/alt), sensor readings, trip status, battery level
- **OfflineData model** for SD card sync when rover loses Bluetooth connection
- **RoverImage model** stores metadata + image blobs from rover camera
- **Indexes**: Always index `userId`, `roverId`, `createdAt` for performance

### Frontend Components
- **Maps**: Uses `leaflet` + `react-leaflet` (see `mapview.jsx`)
- **Charts**: `recharts` for analytics
- **Icons**: `lucide-react` for UI elements
- **Animations**: `framer-motion` for transitions
- **State**: React hooks only (no Redux)

---

## Integration Points & Dependencies

### External Services
- **Firebase**: Auth (client) + Admin SDK (server for token verification)
- **MongoDB Atlas**: Cloud or local MongoDB instance
- **SerialPort**: Hardware communication via USB (requires native bindings)

### Key Files for Cross-Component Understanding
- [backend/server.js](../../backend/server.js) - Bootstrap: Bluetooth init, MongoDB connect, port listen
- [backend/src/app.js](../../backend/src/app.js) - Express config: CORS, routes, middleware
- [backend/src/services/bluetoothHandler.js](../../backend/src/services/bluetoothHandler.js) - Rover comm protocol (351 lines)
- [backend/src/routes/rover.routes.js](../../backend/src/routes/rover.routes.js) - 18 rover endpoints
- [frontend/src/services/api.js](../../frontend/src/services/api.js) - Axios instance with auth interceptor
- [frontend/src/context/AuthContext.jsx](../../frontend/src/context/AuthContext.jsx) - Auth state provider

### Dependency Gotchas
- **SerialPort v12**: Requires native build tools; on Windows, may need Visual C++ build tools
- **Firebase**: Must have `GOOGLE_APPLICATION_CREDENTIALS` or `firebase-service-account.json` for admin operations
- **CORS**: Hardcoded to localhost:5173; change if frontend port differs
- **Mongoose**: v8+; ensure MongoDB 4.4+ for new features used in models

---

## When Adding Features

1. **New Rover Commands**: Extend `bluetoothHandler.sendCommand()` + add to rover.routes.js
2. **New Sensor Data**: Add handler in `bluetoothHandler.parseRoverData()` switch statement
3. **New API Endpoints**: Create controller in `src/controllers/`, add route, ensure auth middleware
4. **New Frontend Pages**: Create in `src/pages/`, add route in `App.jsx`, protect if needed in `ProtectedRoute`
5. **New Database Model**: Create in `src/models/`, export, use in controllers

---

## Document References

- [BLUETOOTH_ROVER_SYSTEM.md](../../BLUETOOTH_ROVER_SYSTEM.md) - System architecture (500+ lines)
- [ROVER_FIRMWARE_GUIDE.md](../../ROVER_FIRMWARE_GUIDE.md) - Hardware & ESP32 code
- [QUICK_START.md](../../QUICK_START.md) - 10-minute setup
- [FILE_MANIFEST.md](../../FILE_MANIFEST.md) - Complete file inventory
- [TESTING_GUIDE.md](../../TESTING_GUIDE.md) - Test workflows
