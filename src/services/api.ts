import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { refreshAccessToken } from "./auth";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // https://digitalwealth.in/
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  let token = await AsyncStorage.getItem("token");
  if (token) {
    try {
      const parsed = JSON.parse(token);
      token = parsed?.token ?? parsed?.accessToken ?? token;
    } catch {}
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let queue: any[] = [];

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => queue.push(resolve)).then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        });
      }

      isRefreshing = true;
      const refreshToken = await AsyncStorage.getItem("refreshToken");

      const { accessToken } = await refreshAccessToken(refreshToken!);
      await AsyncStorage.setItem("accessToken", accessToken);

      queue.forEach((cb) => cb(accessToken));
      queue = [];
      isRefreshing = false;

      original.headers.Authorization = `Bearer ${accessToken}`;
      return api(original);
    }

    return Promise.reject(error);
  }
);

export default api;
