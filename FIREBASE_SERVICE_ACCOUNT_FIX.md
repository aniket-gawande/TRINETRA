# ⚠️ Firebase Admin SDK Not Initialized

## The Problem
The backend is trying to use Firebase Admin SDK but the `firebase-service-account.json` file is missing.

## Why It's Needed
- Firebase Admin SDK is required to verify user login tokens
- Without it, authentication doesn't work
- The file contains your Firebase project credentials

## ✅ Quick Fix (5 minutes)

### Step 1: Get Your Firebase Service Account Key
1. Open: https://console.firebase.google.com/
2. Select your project: **trinetra-ebdd7**
3. Go to: **Project Settings** (gear icon)
4. Click: **Service Accounts** tab
5. Click: **Generate New Private Key** button
6. A JSON file will download automatically

### Step 2: Save the File
1. Rename the downloaded file to: `firebase-service-account.json`
2. Move it to: `backend/` folder (same level as `package.json`)
3. **Don't commit this file!** (It's in .gitignore)

### Step 3: Verify It Works
```bash
# Restart the backend
npm run dev

# You should see:
# ✅ Firebase Admin Initialized Successfully
```

---

## ⚙️ What the File Contains

```json
{
  "type": "service_account",
  "project_id": "trinetra-ebdd7",
  "private_key_id": "your-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...",
  "client_email": "firebase-adminsdk-xxxxx@trinetra-ebdd7.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

---

## 🔍 Verify Setup

### Check 1: File Exists
```bash
ls backend/firebase-service-account.json
# Should exist (not show "file not found")
```

### Check 2: Valid JSON
```bash
cat backend/firebase-service-account.json | python -m json.tool
# Should show formatted JSON, not errors
```

### Check 3: Required Fields
The file must have these fields:
- ✅ `project_id`
- ✅ `private_key`
- ✅ `client_email`

### Check 4: Backend Logs
Run: `npm run dev`
Look for:
- ✅ `✅ Firebase Admin Initialized Successfully` - Good!
- ❌ `❌ Firebase Initialization Error` - Check file

---

## 🚨 If It Still Doesn't Work

### Issue: "Cannot find module"
**Cause:** File path is wrong or file doesn't exist
**Fix:** Verify file is in `backend/` folder exactly

### Issue: "Missing required fields"
**Cause:** Downloaded wrong file or file is corrupted
**Fix:** Download a fresh key from Firebase Console

### Issue: "Invalid JSON"
**Cause:** File was modified or saved incorrectly
**Fix:** Delete and re-download from Firebase Console

### Issue: "Firebase project not found"
**Cause:** Using wrong project ID
**Fix:** Verify project ID is `trinetra-ebdd7` in Firebase Console

---

## 🔐 Security Note

**⚠️ NEVER commit this file to git!**
- It's already in `.gitignore`
- Contains sensitive credentials
- Could expose your Firebase project
- Rotate keys regularly for production

---

## Troubleshooting Commands

### Test Firebase Connection
```bash
cd backend
npm run dev
# Look for initialization message
```

### Test File Exists
```bash
# Windows PowerShell
Test-Path backend/firebase-service-account.json

# Linux/Mac
test -f backend/firebase-service-account.json && echo "File exists"
```

### View File Contents
```bash
# Windows
type backend\firebase-service-account.json

# Linux/Mac
cat backend/firebase-service-account.json
```

### Verify JSON is Valid
```bash
# Python
python -m json.tool backend/firebase-service-account.json

# Node.js
node -e "console.log(require('./backend/firebase-service-account.json'))"
```

---

## Next Steps After Fixing

1. ✅ Restart backend: `npm run dev`
2. ✅ Check for "Firebase Admin Initialized" log
3. ✅ Try login in the app
4. ✅ Try adding waypoints
5. ✅ Check console for "Token verified" logs

---

## Still Not Working?

### Reset Procedure
```bash
# 1. Delete the old file
rm backend/firebase-service-account.json

# 2. Download fresh key from Firebase Console
# (Follow the Quick Fix steps above)

# 3. Save to backend/ folder

# 4. Restart backend
npm run dev

# 5. Check logs
```

### Contact Support
If still failing:
1. Check the full error message in terminal
2. Verify Firebase project ID is correct
3. Ensure file is in correct location
4. Check file has correct format (valid JSON)
5. Review this guide step-by-step

---

## Firebase Console Reference

**URL:** https://console.firebase.google.com/

**Project:** trinetra-ebdd7

**File Location in Console:**
```
Firebase Console
└── Projects
    └── trinetra-ebdd7
        └── Project Settings ⚙️
            └── Service Accounts
                └── Generate New Private Key 🔑
```

---

**Once configured, authentication will work! ✅**
