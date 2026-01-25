import axios from "axios";
import { auth } from "../firebase";

export const api = axios.create({
  baseURL: "http://localhost:5000/api", // Make sure this matches your Backend Port
});

// 🔐 Interceptor: Automatically adds the Token to every request
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user) {
    try {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.error("Token Error:", error);
    }
  }

  return config;
});