@echo off
REM TRINETRA Project Frontend Startup Script for Windows

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║          🌍 TRINETRA - Frontend Startup               ║
echo ║     Climate Intelligence & Rover Navigation Platform   ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found!
    echo.
    echo Please run this script from the 'frontend' directory:
    echo   cd C:\TRINETRA\frontend
    echo   .\start-frontend.bat
    echo.
    pause
    exit /b 1
)

echo ✅ Found package.json
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo ⚠️  node_modules not found. Installing dependencies...
    echo This may take a few minutes...
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

REM Start the frontend development server
echo.
echo 🚀 Starting TRINETRA Frontend Development Server...
echo ════════════════════════════════════════════════════════
echo.
echo Expected to see:
echo   ➜ Local: http://localhost:5173/
echo.
echo To access the app:
echo   1. Open: http://localhost:5173
echo   2. Sign up or Log in
echo   3. Start using TRINETRA!
echo.
echo Make sure Backend is running on port 5000!
echo Press Ctrl+C to stop the server
echo.
echo ════════════════════════════════════════════════════════
echo.

npm run dev

pause
