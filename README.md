# 🌍 TRINETRA – Climate Intelligence & Rover Navigation Platform

TRINETRA is a **real-time climate monitoring and GPS-based rover navigation platform** built using the **MERN stack**. It combines **interactive maps, live sensor simulation, waypoint-based navigation, and IoT readiness** to support smart-city and disaster-management use cases.

---

## 🚀 Quick Start (5 Minutes)

### **Prerequisites**
- Node.js v18+ ([Download](https://nodejs.org/))
- Git ([Download](https://git-scm.com/))
- MongoDB ([MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or [Local](https://docs.mongodb.com/manual/installation/))

### **Installation**

```bash
# 1. Clone repository
git clone https://github.com/aniket-gawande/TRINETRA.git
cd TRINETRA

# 2. Backend setup
cd backend
npm install
# Create .env file with MONGODB_URI

# 3. Frontend setup
cd ../frontend
npm install
```

### **Run Project**

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

**Access App:** Open http://localhost:5173 in your browser 🎉

---

## � NEW: Bluetooth-Based Rover System (v1.0)

The TRINETRA rover system has been **redesigned to use Bluetooth serial communication** instead of WiFi. This enables:

### 🔋 Key Features
- **Real-time GPS tracking** with Bluetooth serial communication
- **Offline-first architecture** - data stored on SD card when out of range
- **Automatic data sync** when rover reconnects
- **Camera integration** for crop/field imaging
- **Multi-sensor support** (GPS, temperature, humidity, soil moisture, light)
- **Battery monitoring** with low-power optimization

### 📋 System Components

#### Backend (Node.js/Express)
- **Bluetooth Handler Service** (350+ lines) - Manages ESP32 communication
- **MongoDB Models** - Rover, RoverImage, OfflineData
- **18 RESTful API Endpoints** - Complete rover control
- **JSON Protocol** - Structured Bluetooth messaging

#### Hardware (ESP32)
- **ESP32 with Bluetooth** - Main microcontroller
- **NEO-6M GPS Module** - Location tracking
- **OV2640 Camera** - Crop imaging
- **SD Card Module** - Offline data storage
- **Environmental Sensors** - Temperature, humidity, soil moisture, light

#### Documentation
- **[BLUETOOTH_ROVER_SYSTEM.md](BLUETOOTH_ROVER_SYSTEM.md)** - Complete system guide (500+ lines)
- **[ROVER_FIRMWARE_GUIDE.md](ROVER_FIRMWARE_GUIDE.md)** - Arduino code & wiring (600+ lines)
- **[QUICK_START.md](QUICK_START.md)** - 10-minute setup guide

### 🚀 Quick Start - Rover System

```bash
# 1. Install Bluetooth dependencies
cd backend
npm install serialport @serialport/parser-readline

# 2. Configure environment
echo "BLUETOOTH_PORT=COM5" >> .env
echo "BLUETOOTH_BAUD_RATE=115200" >> .env

# 3. Start server
npm start
```

✅ Server initializes Bluetooth automatically on startup

---

## �📖 Complete Setup Guide

**👉 For detailed step-by-step installation, Firebase setup, and collaboration guide, see [README_COMPLETE.md](README_COMPLETE.md)**

This includes:
- ✅ Detailed prerequisites installation
- ✅ Complete backend setup with MongoDB
- ✅ Firebase authentication setup (required!)
- ✅ Frontend configuration
- ✅ Running the complete project
- ✅ Git workflow for team collaboration
- ✅ API documentation
- ✅ Troubleshooting guide

---

## ✨ Key Features

### 🗺 Interactive Map (Core Feature)
- Live GPS-based **user location detection**
- Click-to-add **waypoints with latitude & longitude**
- Auto-numbered waypoint markers
- Polyline route connecting waypoints
- “Clear Route” functionality
- Google Maps–like **zoom-to-location UX**

### 🚗 Rover Simulation
- Rover starts from **user GPS location**
- Live rover movement simulation
- Ready to connect with **RC car / ESP32 / GPS module**
- Waypoints stored in backend for autonomous navigation

### 📊 Climate Intelligence (Simulated)
- AQI (PM2.5)
- Temperature
- Humidity
- Water level
- Fire detection
- Sensor popups on every waypoint

### 📍 Dashboard & Pages
- Home (Mission Control overview)
- Map / Planner (Route planning)
- Dashboard (Climate summary)
- Analytics (Trends & graphs – mock)
- Alerts (Event simulation)
- About (Architecture & vision)

---

## 🧠 System Architecture

```

User Browser
↓
React + Leaflet (Frontend)
↓
Node.js + Express (API)
↓
MongoDB (Waypoints Storage)
↓
ESP32 / GPS / RC Rover (Future Integration)

```

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React-Leaflet
- Tailwind / CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- REST APIs

### Tools
- Git & GitHub
- VS Code
- Postman

---

## 📂 Project Structure

```

TRINETRA/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── vite.config.js
│
└── README.md

````

---

## 📖 Complete Setup Guide

**👉 For detailed step-by-step installation, Firebase setup, and collaboration guide, see [README_COMPLETE.md](README_COMPLETE.md)**

This includes:
- ✅ Detailed prerequisites installation
- ✅ Complete backend setup with MongoDB
- ✅ Firebase authentication setup (required!)
- ✅ Frontend configuration
- ✅ Running the complete project
- ✅ Git workflow for team collaboration
- ✅ API documentation
- ✅ Troubleshooting guide

---

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/waypoints` | Add waypoint |
| GET | `/api/waypoints` | Get all waypoints |
| DELETE | `/api/waypoints` | Clear all waypoints |
| GET | `/api/rover/status` | Rover position |
| POST | `/api/rover/start` | Start navigation |

**Full API docs**: See [README_COMPLETE.md](README_COMPLETE.md#-api-endpoints)

---

## 🤝 Collaboration Workflow

### **Create Feature Branch**
```bash
git checkout -b feat/your-feature-name
```

### **Commit with Message**
```bash
git commit -m "feat: add rover movement"
# Types: feat, fix, ui, docs, refactor
```

### **Push & Create PR**
```bash
git push origin feat/your-feature-name
# Then create Pull Request on GitHub
```

**Full guide**: See [README_COMPLETE.md](README_COMPLETE.md#-collaboration-guide)

---

## 🔐 Firebase Setup

⚠️ **Required for authentication to work!**

1. Create Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Generate service account key → Save as `backend/firebase-service-account.json`
3. Enable Email/Password authentication
4. Backend will auto-initialize Firebase

**Detailed guide**: See [README_COMPLETE.md](README_COMPLETE.md#-firebase-setup-detailed) or [FIREBASE_SETUP.md](backend/FIREBASE_SETUP.md)

---

## 🐛 Common Issues?

### **MongoDB connection error?**
- Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud database)
- Or install [MongoDB locally](https://docs.mongodb.com/manual/installation/)
- Update `MONGODB_URI` in `backend/.env`

### **Firebase service account error?**
- Check if `backend/firebase-service-account.json` exists
- Regenerate from Firebase Console if missing

### **Port already in use?**
- Change `PORT` in `backend/.env` (e.g., 5001)
- Or kill existing process on that port

**More troubleshooting**: See [README_COMPLETE.md](README_COMPLETE.md#-troubleshooting)

---

## 📚 Resources

- 📖 [Complete Setup Guide](README_COMPLETE.md) – Detailed instructions
- 🔥 [Firebase Setup Guide](backend/FIREBASE_SETUP.md) – Firebase configuration
- 💻 [Node.js Docs](https://nodejs.org/docs/)
- ⚛️ [React Docs](https://react.dev/)
- 🍃 [MongoDB Docs](https://docs.mongodb.com/)

---

## 🎯 What to do next?

1. ✅ Follow [Quick Start](#-quick-start-5-minutes) above
2. 📖 Read [README_COMPLETE.md](README_COMPLETE.md) for detailed setup
3. 🔥 Set up Firebase using [FIREBASE_SETUP.md](backend/FIREBASE_SETUP.md)
4. 🚀 Start contributing using Git workflow
5. 💡 Check [Issues](https://github.com/aniket-gawande/TRINETRA/issues) for features to work on

---

## 🔮 Future Enhancements

- [ ] Real sensor integration (MQ135, DHT11, GPS)
- [ ] AI-powered fire/smoke detection
- [ ] Live rover fleet monitoring
- [ ] Government disaster management dashboard
- [ ] Predictive climate analytics (ML)
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Offline-first capabilities

---

## 👥 Team

- **Lead Developer**: Aniket Gawande
- **Contributors**: See [GitHub Contributors](https://github.com/aniket-gawande/TRINETRA/graphs/contributors)

---

## 📄 License

Educational and Hackathon Project – Feel free to fork & modify!

---

## 🌟 Support

Found this helpful? Give us a ⭐ on [GitHub](https://github.com/aniket-gawande/TRINETRA)!

```
╔════════════════════════════════════╗
║  🌍 Climate Intelligence Platform 🌍   ║
║     Happy Coding with TRINETRA!    ║
╚════════════════════════════════════╝
```

---

**Last Updated**: January 27, 2026 | **Status**: Active Development ✨

```

