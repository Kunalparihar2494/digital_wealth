// src/services/api.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL; // 🔹 Replace with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Automatically attach token (if available) for authorized calls
api.interceptors.request.use(async (config) => {
  let token = await AsyncStorage.getItem("token");
  if (token) {
    try {
      const parsed = JSON.parse(token);
      token = parsed?.token ?? parsed?.accessToken ?? token;
    } catch (e) {
      // token is already a raw string
    }
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Log the resulting header (helps debug missing/invalid token). Remove in production.
  // console.log("Auth header ->", config.headers?.Authorization);
  return config;
});

export default api;
