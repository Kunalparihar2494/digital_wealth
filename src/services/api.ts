import AsyncStorage from "@react-native-async-storage/async-storage";

// Sabse bada fix: Agar https fail ho, toh http par switch karo
const baseURL_SSL = "https://digitalwealth.in";
const baseURL_NON_SSL = "http://digitalwealth.in";

const api = {
  post: async (endpoint, body) => {
    const token = await AsyncStorage.getItem("accessToken");
    
    // Pehle HTTPS try karein
    let finalUrl = endpoint.startsWith('http') ? endpoint : `${baseURL_SSL}${endpoint}`;
    
    try {
      console.log("🚀 Trying Secure Connection:", finalUrl);
      const response = await fetch(finalUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      return { data, status: response.status };

    } catch (error) {
      // 🔥 AGAR FAIL HUA (Kuch phones ke liye), TOH HTTP PAR TRY KAREIN
      console.log("⚠️ SSL Failed, Falling back to HTTP...");
      const fallbackUrl = finalUrl.replace("https://", "http://");
      
      try {
        const response = await fetch(fallbackUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        return { data, status: response.status };
      } catch (fallbackError) {
        console.log("❌ Both HTTPS and HTTP Failed.");
        throw fallbackError;
      }
    }
  }
};

export default api;
