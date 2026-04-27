import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE = "https://digitalwealth.in";

const api = axios.create({
  baseURL: BASE,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Fix: if url is absolute (starts with http), strip baseURL prefix
  if (config.url?.startsWith("http")) {
    config.url = config.url.replace(BASE + "/", "/").replace(BASE, "");
  }

  return config;
});

// Retry interceptor for network errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // Only retry on network errors (no response), max 2 retries
    if (!error.response && config && !config.__retryCount) {
      config.__retryCount = 0;
    }

    if (!error.response && config && config.__retryCount < 2) {
      config.__retryCount += 1;
      // Wait before retry: 1s, then 2s
      await new Promise((res) => setTimeout(res, config.__retryCount * 1000));
      return api(config);
    }

    return Promise.reject(error);
  },
);

export default api;
