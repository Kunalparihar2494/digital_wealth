// src/services/api.ts
import { secureStorage, TOKEN_KEYS } from "@/src/utils/secureStorage";

const BASE_URL = "https://digitalwealth.in";

const getHeaders = async () => {
  const token = await secureStorage.getToken(TOKEN_KEYS.ACCESS_TOKEN);

  return {
    "Content-Type": "application/json",
    Accept: "application/json",

    // Better support for older Android devices
    Connection: "close",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",

    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (
  response: Response,
  timeoutId: ReturnType<typeof setTimeout>,
) => {
  clearTimeout(timeoutId);

  const responseText = await response.text();
  let parsedData;

  try {
    parsedData = responseText ? JSON.parse(responseText) : {};
    // console.log("API SUCCESS DATA:", parsedData);
  } catch {
    // console.log("API PARSE ERROR. RAW TEXT:", responseText);
    parsedData = { message: responseText };
  }

  return {
    data: parsedData,
    status: response.status,
  };
};

const api = {
  // ---------------- POST ----------------
  post: async (endpoint: string, body?: unknown) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const headers = await getHeaders();

      const url = endpoint.startsWith("http")
        ? endpoint
        : `${BASE_URL}${endpoint}`;

      console.log("POST API:", url);
      console.log("POST BODY:", body);
      const response = await fetch(url, {
        method: "POST",
        headers,

        // Only send body if it actually exists
        ...(body ? { body: JSON.stringify(body) } : {}),

        signal: controller.signal,
      });

      return await handleResponse(response, timeoutId);
    } catch (error: unknown) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === "AbortError") {
        console.error("POST API ERROR: Request Timeout");
      } else {
        console.error("POST API ERROR:", error);
      }

      throw error;
    }
  },

  // ---------------- GET ----------------
  get: async (endpoint: string) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const headers = await getHeaders();

      const url = endpoint.startsWith("http")
        ? endpoint
        : `${BASE_URL}${endpoint}`;

      console.log("GET API:", url);

      const response = await fetch(url, {
        method: "GET",
        headers,
        signal: controller.signal,
      });

      return await handleResponse(response, timeoutId);
    } catch (error: unknown) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === "AbortError") {
        console.error("GET API ERROR: Request Timeout");
      } else {
        console.error("GET API ERROR:", JSON.stringify(error, null, 2));
      }

      throw error;
    }
  },

  // ---------------- PUT ----------------
  put: async (endpoint: string, body?: unknown) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const headers = await getHeaders();

      const url = endpoint.startsWith("http")
        ? endpoint
        : `${BASE_URL}${endpoint}`;

      console.log("PUT API:", url);

      const response = await fetch(url, {
        method: "PUT",
        headers,
        body: body ? JSON.stringify(body) : JSON.stringify({}),
        signal: controller.signal,
      });

      return await handleResponse(response, timeoutId);
    } catch (error: unknown) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === "AbortError") {
        console.error("PUT API ERROR: Request Timeout");
      } else {
        console.error("PUT API ERROR:", JSON.stringify(error, null, 2));
      }

      throw error;
    }
  },
};

export default api;
