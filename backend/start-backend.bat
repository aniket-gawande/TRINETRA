@echo off
REM TRINETRA Project Startup Script for Windows

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║          🌍 TRINETRA - Backend Startup                ║
echo ║     Climate Intelligence & Rover Navigation Platform   ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found!
    echo.
    echo Please run this script from the 'backend' directory:
    echo   cd C:\TRINETRA\backend
    echo   .\start-backend.bat
    echo.
    pause
    exit /b 1
)

echo ✅ Found package.json
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo ⚠️  node_modules not found. Installing dependencies...
    echo.
    call npm install
    if errorlevel 1 (
        echo.
        echo ❌ npm install failed!
        echo Please try running: npm install
        pause
        exit /b 1
    )
    echo.
)

REM Check if .env exists
if not exist ".env" (
    echo ⚠️  .env file not found!
    echo.
    echo 📋 Creating .env file with default settings...
    (
        echo PORT=5000
        echo MONGO_URI=mongodb://127.0.0.1:27017/trinetra
        echo NODE_ENV=development
    ) > .env
    echo ✅ Created .env file
    echo.
)

REM Check if firebase-service-account.json exists
if not exist "firebase-service-account.json" (
    echo ⚠️  firebase-service-account.json not found!
    echo.
    echo 📋 To fix this:
    echo 1. Go to: https://console.firebase.google.com
    echo 2. Project Settings → Service Accounts → Generate New Private Key
    echo 3. Save downloaded file as: backend\firebase-service-account.json
    echo 4. Re-run this script
    echo.
)

REM Start the backend server
echo.
echo 🚀 Starting TRINETRA Backend Server...
echo ════════════════════════════════════════════════════════
echo.
echo Expected messages:
echo   ✅ Firebase Admin Initialized Successfully
echo   ✅ MongoDB connected
echo   ✅ Backend running on port 5000
echo.
echo Press Ctrl+C to stop the server
echo.
echo ════════════════════════════════════════════════════════
echo.

npm start

pause
