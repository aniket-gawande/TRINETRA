@echo off
REM Quick Test Script for Waypoint Feature (Windows)

echo.
echo 🚀 TRINETRA Waypoint Testing Guide
echo ====================================
echo.

REM Check backend
echo 1️⃣  START BACKEND (Open Terminal 1):
echo    cd backend
echo    npm run dev
echo    Look for: ✅ Backend running on port 5000
echo.

REM Check frontend
echo 2️⃣  START FRONTEND (Open Terminal 2):
echo    cd frontend
echo    npm run dev
echo    Look for: ✅ Local: http://localhost:5173
echo.

REM Test endpoint
echo 3️⃣  TEST WAYPOINT API (Open Browser):
echo    http://localhost:5000/api/waypoints
echo    http://localhost:5000/api/waypoints/debug/count
echo.

REM View database
echo 4️⃣  VIEW DATABASE (MongoDB Compass):
echo    Connection: mongodb://127.0.0.1:27017
echo    Database: trinetra
echo    Collection: waypoints
echo.

REM Browser console
echo 5️⃣  BROWSER CONSOLE (Press F12 in app):
echo    Look for success messages like:
echo    ✅ Token added to request for user: ...
echo    ✅ Waypoints loaded: [...]
echo    ✅ Waypoint saved successfully: ...
echo.

REM Manual test
echo 6️⃣  MANUAL TESTING STEPS:
echo    1. Go to http://localhost:5173
echo    2. Login with your account
echo    3. Navigate to Planner page
echo    4. Click on the map to add waypoints
echo    5. See waypoints appear in left sidebar
echo    6. Open MongoDB Compass to verify in database
echo    7. Refresh page - waypoints should persist
echo.

REM Check database
echo 7️⃣  VERIFY DATABASE WITH MONGOSH:
echo    mongosh mongodb://127.0.0.1:27017/trinetra
echo    db.waypoints.find()
echo.

REM API test
echo 8️⃣  TEST DEBUG ENDPOINT:
echo    Open: http://localhost:5000/api/waypoints/debug/count
echo    Should show: { "totalCount": X, "waypoints": [...] }
echo.

echo ✨ CHECKLIST:
echo    [ ] Backend running
echo    [ ] Frontend running
echo    [ ] Can login
echo    [ ] Can click map and add waypoint
echo    [ ] Waypoint appears in sidebar
echo    [ ] Status message shows "✅ Waypoint saved"
echo    [ ] Data appears in MongoDB
echo    [ ] Waypoint persists after refresh
echo.

echo If all pass: Waypoints are working! 🎉
echo.

pause
