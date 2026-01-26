# Authentication Troubleshooting Guide

## Error: "Unauthorized: Invalid token"

### Root Causes & Solutions

#### 1. **Firebase Service Account Not Found** ⚠️
**Problem:** Backend can't verify tokens because Firebase Admin SDK isn't initialized.

**Solution:**
```bash
# 1. Download service account from Firebase Console:
# - Go to: https://console.firebase.google.com
# - Project Settings → Service Accounts → Generate New Private Key

# 2. Save the file as:
backend/firebase-service-account.json

# 3. Restart the backend server
npm run dev  # or nodemon server.js
```

#### 2. **User Not Logged In** 👤
**Problem:** Frontend sending request without a token.

**Solution:**
```
✅ Make sure you're logged in to the app
✅ Check browser console (F12) for token logs
✅ Sign up/Login before making API requests
```

#### 3. **Token Expired** ⏰
**Problem:** Firebase ID token has expired (valid for ~1 hour).

**Solution:**
```
✅ Refresh the page
✅ Log out and log back in
✅ Clear browser cache (Ctrl+Shift+Delete)
```

#### 4. **CORS Issues** 🔗
**Problem:** Frontend and backend on different domains/ports.

**Solution:**
Verify `backend/src/app.js` has correct CORS config:
```javascript
app.use(cors({
  origin: [
    "http://localhost:5173",    // Vite frontend
    "http://127.0.0.1:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
```

---

## Debugging Steps

### Step 1: Check Browser Console
```
Open: F12 → Console Tab
Look for:
✅ "Token added to request for user: ..."  → Good
❌ "No user logged in" → User not authenticated
❌ "Token Error: ..." → Token generation failed
```

### Step 2: Check Backend Logs
```
Look in terminal where `npm run dev` runs:
✅ "Token verified for user: ..." → Token is valid
❌ "Firebase Admin SDK not initialized" → Missing service account
❌ "Cannot find module 'firebase-service-account.json'" → File missing
```

### Step 3: Verify Firebase Configuration
```bash
# Check if file exists
ls backend/firebase-service-account.json

# Should NOT be in .gitignore (already is)
cat .gitignore | grep firebase
```

### Step 4: Test Token Generation
```javascript
// Open browser console and run:
const user = firebase.auth().currentUser;
if (user) {
  user.getIdToken().then(token => console.log("Token:", token));
} else {
  console.log("No user logged in");
}
```

---

## Complete Checklist

- [ ] Firebase service account file exists: `backend/firebase-service-account.json`
- [ ] Backend is running: `npm run dev` in `backend/` folder
- [ ] Frontend is running: `npm run dev` in `frontend/` folder
- [ ] User is logged in (check app UI)
- [ ] Browser console shows "✅ Token added to request"
- [ ] Backend logs show "✅ Token verified for user"
- [ ] Backend has valid Firebase credentials
- [ ] .env file has correct PORT and MONGO_URI

---

## Quick Fixes

```bash
# 1. Restart everything
# Terminal 1 (Backend)
cd backend
npm install  # Install missing deps
npm run dev

# Terminal 2 (Frontend)
cd frontend
npm install
npm run dev

# 2. Clear browser data
# Browser → Settings → Clear browsing data → Cookies, cached images
# Then refresh the page

# 3. Check logs
# Backend: Look for "✅ Firebase Admin Initialized"
# Frontend: F12 Console → Look for token logs
```

---

## Firestore/Database Issues

If token verification passes but database operations fail:

1. **Check MongoDB connection:**
   ```bash
   # Verify MONGO_URI in backend/.env
   echo $MONGO_URI  # Should show connection string
   ```

2. **Check Firestore rules:**
   - Firebase Console → Firestore Database → Rules
   - Ensure rules allow authenticated users

3. **Check API endpoints:**
   - POST `/api/waypoints` - requires authentication
   - GET `/api/waypoints` - public for rover access
   - DELETE `/api/waypoints` - requires authentication

---

## Contact Support

If issues persist:
1. Share backend console output
2. Share browser console (F12)
3. Verify service account file is valid JSON
4. Check that Firebase project ID matches in `firebase.js`
