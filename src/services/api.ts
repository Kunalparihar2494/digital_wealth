import { refreshAccessToken } from "@/src/services/auth";
import { getDeviceId } from "@/src/utils/device";
import { logout } from "@/src/utils/logout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getBiometricData } from "../store/biometric.store";

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
let isRefreshing = false;
let queue: ((token: string) => void)[] = [];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 🟡 If refresh already running → queue request
      if (isRefreshing) {
        return new Promise((resolve) => {
          queue.push((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        const deviceId = await getDeviceId();

        if (!refreshToken || !deviceId) {
          throw new Error("Missing refresh credentials");
        }
        const bio = await getBiometricData();

        if (!bio) {
          throw new Error("Missing biometric data");
        }

        const refreshResp = await refreshAccessToken(
          bio.refreshToken,
          bio.deviceId,
          bio.Contact,
        );

        if (!refreshResp?.accessToken) {
          throw new Error("Invalid refresh response");
        }

        await AsyncStorage.setItem("accessToken", refreshResp.accessToken);

        // 🔁 Replay queued requests
        queue.forEach((cb) => cb(refreshResp.accessToken));
        queue = [];

        originalRequest.headers.Authorization = `Bearer ${refreshResp.accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        queue = [];
        await logout(); // 🚨 HARD LOGOUT
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
