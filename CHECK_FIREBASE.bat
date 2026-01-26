@echo off
REM Firebase Admin SDK Diagnostic Script

echo.
echo 🔍 FIREBASE ADMIN SDK DIAGNOSTIC TOOL
echo ======================================
echo.

REM Check 1: File Exists
echo 1️⃣  Checking if firebase-service-account.json exists...
if exist "backend\firebase-service-account.json" (
    echo   ✅ File exists in backend/ folder
) else (
    echo   ❌ File NOT FOUND in backend/ folder
    echo   👉 Action: Download from Firebase Console and save to backend/ folder
)
echo.

REM Check 2: Example File
echo 2️⃣  Checking if example file exists...
if exist "backend\firebase-service-account.example.json" (
    echo   ✅ Example file found (reference)
) else (
    echo   ⚠️  Example file not found
)
echo.

REM Check 3: .env File
echo 3️⃣  Checking .env configuration...
if exist "backend\.env" (
    echo   ✅ .env file exists
    for /f "tokens=*" %%A in (backend\.env) do (
        if not "%%A"=="" (
            echo   - %%A
        )
    )
) else (
    echo   ❌ .env file NOT found
)
echo.

REM Check 4: Node Modules
echo 4️⃣  Checking if firebase-admin is installed...
if exist "backend\node_modules\firebase-admin" (
    echo   ✅ firebase-admin package found
) else (
    echo   ❌ firebase-admin NOT installed
    echo   👉 Action: Run 'npm install' in backend folder
)
echo.

REM Check 5: Service Account Format
echo 5️⃣  Checking firebase-service-account.json format...
if exist "backend\firebase-service-account.json" (
    REM Try to read and validate JSON
    echo   Attempting to validate JSON...
    for /f "delims=" %%A in (backend\firebase-service-account.json) do (
        if "%%A"=="{" (
            echo   ✅ File appears to be valid JSON
            goto :validate_fields
        )
    )
    echo   ❌ File does not appear to be valid JSON
    goto :fields_check_done
    
    :validate_fields
    REM Check for required fields
    findstr /M "project_id" backend\firebase-service-account.json >nul
    if errorlevel 1 (
        echo   ❌ Missing: project_id
    ) else (
        echo   ✅ Contains: project_id
    )
    
    findstr /M "private_key" backend\firebase-service-account.json >nul
    if errorlevel 1 (
        echo   ❌ Missing: private_key
    ) else (
        echo   ✅ Contains: private_key
    )
    
    findstr /M "client_email" backend\firebase-service-account.json >nul
    if errorlevel 1 (
        echo   ❌ Missing: client_email
    ) else (
        echo   ✅ Contains: client_email
    )
    
    :fields_check_done
) else (
    echo   ⏭️  Skipped (file not found)
)
echo.

REM Check 6: Directory Structure
echo 6️⃣  Checking backend directory structure...
if exist "backend" (
    echo   ✅ backend/ folder exists
    if exist "backend\src" (
        echo   ✅ src/ subfolder exists
    ) else (
        echo   ❌ src/ subfolder NOT found
    )
    if exist "backend\package.json" (
        echo   ✅ package.json exists
    ) else (
        echo   ❌ package.json NOT found
    )
) else (
    echo   ❌ backend/ folder NOT found
)
echo.

REM Check 7: Summary and Recommendations
echo 📋 SUMMARY & RECOMMENDATIONS
echo =============================
echo.
echo To fix "Firebase Admin SDK not initialized" error:
echo.
echo STEP 1: Get Service Account Key
echo   1. Go to: https://console.firebase.google.com/
echo   2. Select project: trinetra-ebdd7
echo   3. Go to: Project Settings (gear icon)
echo   4. Click: Service Accounts tab
echo   5. Click: Generate New Private Key button
echo.
echo STEP 2: Save the File
echo   1. Rename to: firebase-service-account.json
echo   2. Save to: backend/ folder
echo   3. ⚠️  Do NOT commit to git (in .gitignore)
echo.
echo STEP 3: Restart Backend
echo   cd backend
echo   npm run dev
echo.
echo STEP 4: Verify
echo   Look for log: "✅ Firebase Admin Initialized Successfully"
echo.

pause
