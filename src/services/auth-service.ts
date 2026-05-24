import AsyncStorage from "@react-native-async-storage/async-storage";

import { STORAGE_KEYS } from "@/src/constants/storage";
import api from "@/src/services/api";
import { useAuthStore } from "@/src/store/auth.store";
import { secureStorage, TOKEN_KEYS } from "@/src/utils/secureStorage";

interface TokenResponse {
  accessToken?: string;
  refreshToken?: string;
  refreshtoken?: string;
  expiresIn?: number;
  token?: string;
}

export class AuthService {
  static async storeTokens(response: TokenResponse): Promise<void> {
    const accessToken = response.accessToken || response.token;
    const refreshToken = response.refreshToken || response.refreshtoken;

    if (!accessToken) {
      throw new Error("No access token in response");
    }

    await secureStorage.setToken(TOKEN_KEYS.ACCESS_TOKEN, accessToken);

    if (refreshToken) {
      await secureStorage.setToken(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
    }

    const expiryTime = Date.now() + (response.expiresIn || 3600) * 1000;
    await AsyncStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRY, expiryTime.toString());
    await useAuthStore.getState().setAuth(accessToken, refreshToken);
  }

  static async isTokenExpired(): Promise<boolean> {
    const expiryTime = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY);
    if (!expiryTime) return true;
    return Date.now() > parseInt(expiryTime, 10);
  }

  static async refreshTokenIfNeeded(): Promise<boolean> {
    if (!(await this.isTokenExpired())) {
      return true;
    }

    try {
      const refreshToken = await secureStorage.getToken(TOKEN_KEYS.REFRESH_TOKEN);
      if (!refreshToken) return false;

      const deviceId = await secureStorage.getToken(TOKEN_KEYS.DEVICE_ID);
      const response = await api.post("/AppAccess/refresh", {
        refreshToken,
        deviceId,
      });

      if (response?.data?.accessToken || response?.data?.token) {
        await this.storeTokens(response.data);
        return true;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      await this.logout();
      return false;
    }

    return false;
  }

  static async logout(): Promise<void> {
    await secureStorage.clearAll();
    await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRY);
    await useAuthStore.getState().logout();
  }
}
