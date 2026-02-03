import { refreshAccessToken } from "@/src/services/auth";
import { logout } from "@/src/utils/logout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   REQUEST INTERCEPTOR
========================= */
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* =========================
   RESPONSE INTERCEPTOR
========================= */
/* =========================
   RESPONSE INTERCEPTOR
========================= */

let isRefreshing = false;
let queue: ((token: string | null) => void)[] = [];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    // ⛔ login / refresh APIs ko skip karo
    if (
      originalRequest?.url?.includes("/login") ||
      originalRequest?.url?.includes("/refresh")
    ) {
      return Promise.reject(error);
    }

    if (error.response.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // 🔁 already refreshing → queue
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push((token) => {
          if (!token) return reject(error);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(api(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      // ✅ ONLY AsyncStorage (safe on Android 10 + 14)
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      const deviceId = await AsyncStorage.getItem("deviceId");

      if (!refreshToken || !deviceId) {
        throw new Error("Session expired");
      }

      const refreshResp = await refreshAccessToken(
        refreshToken,
        deviceId
      );

      if (!refreshResp?.token) {
        throw new Error("Invalid refresh response");
      }

      await AsyncStorage.setItem("accessToken", refreshResp.token);

      // 🔁 replay queued requests
      queue.forEach((cb) => cb(refreshResp.token));
      queue = [];

      originalRequest.headers.Authorization =
        `Bearer ${refreshResp.token}`;

      return api(originalRequest);
    } catch (e) {
      console.error("Refresh failed:", e);
      queue = [];
      await logout(); // 🚨 logout only when truly invalid
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);


export default api;
