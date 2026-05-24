import AsyncStorage from "@react-native-async-storage/async-storage";
import { secureStorage, TOKEN_KEYS } from "@/src/utils/secureStorage";

const USER_KEY = "userData";
const TOKEN_KEY = "token";

// ✅ Save user object
export const saveUser = async (user: any) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (err) {
    console.error("Error saving user:", err);
  }
};

// ✅ Get user object
export const getUser = async () => {
  try {
    const json = await AsyncStorage.getItem(USER_KEY);
    return json ? JSON.parse(json) : null;
  } catch (err) {
    console.error("Error getting user:", err);
    return null;
  }
};

// ✅ Save token
export const saveToken = async (token: string) => {
  try {
    await secureStorage.setToken(TOKEN_KEYS.ACCESS_TOKEN, token);
  } catch (err) {
    console.error("Error saving token:", err);
  }
};

// ✅ Get token
export const getToken = async () => {
  try {
    return await secureStorage.getToken(TOKEN_KEYS.ACCESS_TOKEN);
  } catch (err) {
    console.error("Error getting token:", err);
    return null;
  }
};

// ✅ Clear all user data (logout)
export const clearUserData = async () => {
  try {
    await AsyncStorage.multiRemove([USER_KEY, TOKEN_KEY]);
    await secureStorage.removeToken(TOKEN_KEYS.ACCESS_TOKEN);
    await secureStorage.removeToken(TOKEN_KEYS.REFRESH_TOKEN);
  } catch (err) {
    console.error("Error clearing storage:", err);
  }
};
