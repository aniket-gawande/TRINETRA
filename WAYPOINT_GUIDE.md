# Waypoint Management Guide

## How to Place & Save Waypoints 📍

### 1. Login First
- ✅ Sign up or login using Firebase authentication
- You must be logged in to create/save waypoints

### 2. Click on the Map
- Navigate to the **Planner** page
- **Click anywhere on the map** to place a waypoint
- A blue numbered marker (🔵) will appear
- You'll see a status message: "✅ Waypoint saved!"

### 3. View Saved Waypoints
- Left sidebar shows all waypoints with coordinates
- Each waypoint displays: `WP1: 18.65170, 73.76150`
- Coordinates are precise to 5 decimal places (±1.1 meters)

### 4. Clear All Waypoints
- Click **"Clear Route"** button (red)
- Confirms before deleting
- All markers disappear from map

---

## Viewing Points in Database 🗄️

### Option 1: View in Browser Console
```
1. Open the app in browser
2. Open DevTools: Press F12
3. Go to Console tab
4. Look for logs like:
   "✅ Waypoints found: [{ id: '...', lat: 18.65, lng: 73.76, order: 1 }, ...]"
```

### Option 2: View in Database
```
1. Access MongoDB directly:
   - Connection: mongodb://127.0.0.1:27017/trinetra
   
2. View Waypoints collection:
   - Database: trinetra
   - Collection: waypoints
   - Shows all saved waypoints with _id, lat, lng, order, createdAt
```

### Option 3: API Debug Endpoint
```
1. Open browser and visit:
   http://localhost:5000/api/waypoints/debug/count
   
2. Shows JSON response:
   {
     "totalCount": 5,
     "waypoints": [
       { "_id": "...", "lat": 18.65170, "lng": 73.76150, "order": 1 },
       { "_id": "...", "lat": 18.65175, "lng": 73.76155, "order": 2 },
       ...
     ],
     "timestamp": "2026-01-25T10:30:00.000Z"
   }
```

### Option 4: Check Backend Logs
```
Terminal running backend shows:
✅ Waypoint saved successfully: { id: '...', lat: 18.65, lng: 73.76, order: 1 }
📤 Retrieving 5 waypoints from database
✅ Waypoints found: [...]
```

---

## Data Structure 📊

### Waypoint Schema (MongoDB)
```javascript
{
  _id: ObjectId("..."),           // Auto-generated ID
  lat: 18.6517,                   // Latitude (-90 to 90)
  lng: 73.7615,                   // Longitude (-180 to 180)
  order: 1,                       // Waypoint order in route
  createdAt: Date("2026-01-25")  // Auto-generated timestamp
}
```

---

## API Endpoints

### Create Waypoint (Protected - Requires Login)
```
POST /api/waypoints
Authorization: Bearer <firebase-token>
Content-Type: application/json

{
  "lat": 18.6517,
  "lng": 73.7615,
  "order": 1
}

Response (201 Created):
{
  "_id": "507f1f77bcf86cd799439011",
  "lat": 18.6517,
  "lng": 73.7615,
  "order": 1,
  "createdAt": "2026-01-25T10:30:00.000Z"
}
```

### Get All Waypoints (Public)
```
GET /api/waypoints

Response (200):
[
  { "_id": "...", "lat": 18.6517, "lng": 73.7615, "order": 1 },
  { "_id": "...", "lat": 18.6520, "lng": 73.7620, "order": 2 }
]
```

### Clear Route (Protected - Requires Login)
```
DELETE /api/waypoints
Authorization: Bearer <firebase-token>

Response (200):
{
  "message": "Route cleared",
  "deletedCount": 2
}
```

### Debug Database Count (Public)
```
GET /api/waypoints/debug/count

Response (200):
{
  "totalCount": 2,
  "waypoints": [...],
  "timestamp": "2026-01-25T10:30:00.000Z"
}
```

---

## Troubleshooting

### "Please login to mark waypoints"
→ Sign up/login first before adding waypoints

### Points don't appear on map
→ Check browser console (F12) for errors
→ Make sure waypoints were saved to database

### "Failed to save waypoint"
→ Check coordinates are valid: lat: [-90, 90], lng: [-180, 180]
→ Backend might be down - check if `npm run dev` is running
→ Check authentication token - re-login if needed

### Can't see waypoints in database
→ Verify MongoDB is running: `mongod`
→ Use MongoDB Compass to view database
→ Or use the `/api/waypoints/debug/count` endpoint

### Lost waypoints after refresh
→ Waypoints are stored in database (persistent)
→ Make sure you're logged in with same account
→ Refresh page to reload waypoints from server

---

## Backend Setup Checklist

- [x] MongoDB running (`mongod`)
- [x] Backend server running (`npm run dev`)
- [x] Firebase service account configured
- [x] MONGO_URI set in `.env`
- [x] CORS configured for localhost:5173
- [x] Authorization header being sent

## Frontend Setup Checklist

- [x] Firebase initialized (`firebase.js`)
- [x] API interceptor adds token (`services/api.js`)
- [x] AuthContext provider wraps app (`context/AuthContext.jsx`)
- [x] User can login/signup
- [x] Map loads without errors

---

## Map Interaction Tips

✅ **Single Click** → Places waypoint at exact spot
✅ **Markers numbered** → 1, 2, 3... show waypoint order
✅ **Blue line** → Shows route between waypoints
✅ **Sidebar list** → All waypoints visible with coordinates
✅ **Blue circle** → 10m radius around your location
✅ **Robot emoji** → Rover position (if available)

## Performance Notes

- Map works best at zoom level 18-19 (street level)
- Each waypoint ~0.5KB in database
- Max 1000s of waypoints supported
- Route line auto-connects waypoints in order
