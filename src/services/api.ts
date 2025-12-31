import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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

export default api;
