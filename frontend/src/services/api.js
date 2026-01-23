import axios from "axios";
import { auth } from "../firebase";

export const api = axios.create({
  baseURL: "http://localhost:5000/api", // Must match backend PORT
});

// 🔐 Attach Firebase token to every request
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user) {
    try {
      // Force refresh token if expired
      const token = await user.getIdToken(true);
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  }

  return config;
});