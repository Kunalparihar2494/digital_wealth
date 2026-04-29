// src/services/api.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://digitalwealth.in";

const api = {
  post: async (endpoint: string, body: any) => {
    const controller = new AbortController();
    // Purane phones slow hote hain, isliye timeout 30 seconds rakha hai
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const token = await AsyncStorage.getItem("accessToken");

      const url = endpoint.startsWith("http")
        ? endpoint
        : `${BASE_URL}${endpoint}`;

      console.log("Calling API:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          // 🔥 FIX: Purane Android versions ke liye connection aur cache settings
          "Connection": "close",
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
          "Expires": "0",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body ? JSON.stringify(body) : JSON.stringify({}), 
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // 🔥 FIX FOR OLD PHONES: Safe Parsing
      // Purane Webview mein response.json() aksar crash hota hai
      const responseText = await response.text();
      let parsedData;
      
      try {
        parsedData = responseText ? JSON.parse(responseText) : {};
        console.log("API SUCCESS DATA:", parsedData);
      } catch (e) {
        console.log("API PARSE ERROR. RAW TEXT:", responseText);
        parsedData = { message: responseText }; 
      }

      return {
        data: parsedData,
        status: response.status,
      };
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        console.log("API ERROR: Request Timeout");
      } else {
        console.log("FULL API ERROR:", JSON.stringify(error, null, 2));
      }
      
      throw error;
    }
  },
};

export default api;