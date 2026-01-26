#!/bin/bash
# Quick Test Script for Waypoint Feature

echo "🚀 TRINETRA Waypoint Testing Guide"
echo "===================================="
echo ""

# Check if MongoDB is running
echo "1️⃣  Checking MongoDB..."
if command -v mongosh &> /dev/null; then
  echo "✅ MongoDB shell found"
else
  echo "⚠️  MongoDB shell not found - install MongoDB or MongoDB Compass"
fi

# Check backend
echo ""
echo "2️⃣  Check Backend (Terminal 1):"
echo "   cd backend"
echo "   npm run dev"
echo "   Look for: ✅ Backend running on port 5000"
echo ""

# Check frontend
echo "3️⃣  Check Frontend (Terminal 2):"
echo "   cd frontend"
echo "   npm run dev"
echo "   Look for: ✅ Local: http://localhost:5173"
echo ""

# Test endpoint
echo "4️⃣  Test Waypoint API (in browser or curl):"
echo "   GET http://localhost:5000/api/waypoints"
echo "   GET http://localhost:5000/api/waypoints/debug/count"
echo ""

# View database
echo "5️⃣  View Database (MongoDB Compass):"
echo "   Connection: mongodb://127.0.0.1:27017"
echo "   Database: trinetra"
echo "   Collection: waypoints"
echo ""

# Browser console
echo "6️⃣  Browser Console (F12):"
echo "   Look for:"
echo "   ✅ Token added to request for user: ..."
echo "   ✅ Waypoints loaded: [...]"
echo "   ✅ Waypoint saved successfully: ..."
echo ""

# Manual test
echo "7️⃣  Manual Testing:"
echo "   1. Login to the app"
echo "   2. Click on the map to add a waypoint"
echo "   3. Check sidebar for waypoint list"
echo "   4. Check MongoDB Compass for the data"
echo "   5. Refresh page - waypoints should persist"
echo ""

# Debug endpoint
echo "8️⃣  Debug Database:"
echo "   Open: http://localhost:5000/api/waypoints/debug/count"
echo "   Should show: { totalCount: X, waypoints: [...] }"
echo ""

echo "✨ If everything passes, waypoints are working!"
echo ""
