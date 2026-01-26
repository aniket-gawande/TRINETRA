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
      console.log("✅ Token added to request for user:", user.email);
    } catch (error) {
      console.error("❌ Token Error:", error.message);
      // Continue without token - let backend handle auth error
    }
  } else {
    console.warn("⚠️  No user logged in - request sent without token");
  }

  return config;
});

// 🔴 Response Interceptor: Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("❌ Authentication Error:", error.response.data?.message);
      // You can add logout logic here if needed
      // auth.signOut();
    }
    return Promise.reject(error);
  }
);