import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const TOKEN_KEYS = {
  ACCESS_TOKEN: "app_access_token",
  REFRESH_TOKEN: "app_refresh_token",
  DEVICE_ID: "app_device_id",
} as const;

export const secureStorage = {
  async setToken(key: string, value: string): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.setItem(key, value);
      return;
    }

    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.warn(`Failed to store ${key} securely:`, error);
      await AsyncStorage.setItem(key, value);
    }
  },

  async getToken(key: string): Promise<string | null> {
    if (Platform.OS === "web") {
      return localStorage.getItem(key);
    }

    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.warn(`Failed to retrieve ${key} from secure store:`, error);
      return await AsyncStorage.getItem(key);
    }
  },

  async removeToken(key: string): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.removeItem(key);
      return;
    }

    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.warn(`Failed to remove ${key}:`, error);
      await AsyncStorage.removeItem(key);
    }
  },

  async clearAll(): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.clear();
    } else {
      await Promise.all(
        Object.values(TOKEN_KEYS).map((key) => this.removeToken(key)),
      );
    }

    await AsyncStorage.clear();
  },
};
