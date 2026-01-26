# Firebase Setup Instructions

## Overview
This project uses Firebase Admin SDK for backend authentication and database operations.

## Prerequisites
- Firebase project created (https://console.firebase.google.com)
- Node.js installed
- npm or yarn package manager

## Setup Steps

### 1. Generate Firebase Service Account Key
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Project Settings** → **Service Accounts** tab
4. Click **Generate New Private Key**
5. A JSON file will download automatically

### 2. Add Service Account to Backend
1. Rename the downloaded file to `firebase-service-account.json`
2. Place it in the `backend/` directory (same level as `package.json`)
3. **IMPORTANT**: This file contains sensitive credentials and should NOT be committed to git

### 3. Verify Installation
Run the following command to test Firebase initialization:
```bash
cd backend
npm run start
```

You should see: `✅ Firebase Admin Initialized Successfully`

## File Structure
```
backend/
├── firebase-service-account.json  (⚠️ Keep this SECRET - never commit to git)
├── firebase-service-account.example.json  (Template showing required fields)
├── src/
│   ├── config/
│   │   └── firebaseAdmin.js  (Firebase initialization)
│   └── ...
└── ...
```

## Troubleshooting

### Error: "firebase-service-account.json not found"
- **Solution**: Ensure the file exists in the `backend/` directory and is named correctly

### Error: "Service account JSON is missing required fields"
- **Solution**: Download a fresh service account key from Firebase Console

### Error: "Firebase Admin Already Initialized"
- **Info**: This is normal in development. The app is checking to prevent duplicate initialization

## Security Notes
- ✅ `.gitignore` includes `firebase-service-account.json` (won't be committed)
- ✅ Never share or expose the service account file
- ✅ Consider using environment variables for sensitive keys in production
- ✅ Regularly rotate service account keys in Firebase Console

## Environment Variables (Optional for Advanced Setup)
For added security, you can store the service account in environment variables:
```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```
Then modify `firebaseAdmin.js` to read from environment variables.
