import { create } from "zustand";
import { secureStorage, TOKEN_KEYS } from "@/src/utils/secureStorage";

type AuthState = {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (accessToken: string, refreshToken?: string) => Promise<void>;
  getToken: () => Promise<string | null>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  refreshToken: null,
  isAuthenticated: false,

  setAuth: async (accessToken, refreshToken) => {
    await secureStorage.setToken(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
    if (refreshToken) {
      await secureStorage.setToken(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);
    }
    set({
      token: accessToken,
      refreshToken: refreshToken ?? null,
      isAuthenticated: true,
    });
  },

  getToken: async () => {
    return await secureStorage.getToken(TOKEN_KEYS.ACCESS_TOKEN);
  },

  logout: async () => {
    await secureStorage.clearAll();
    set({ token: null, refreshToken: null, isAuthenticated: false });
  },

  initializeAuth: async () => {
    const token = await secureStorage.getToken(TOKEN_KEYS.ACCESS_TOKEN);
    const refreshToken = await secureStorage.getToken(TOKEN_KEYS.REFRESH_TOKEN);
    set({ token, refreshToken, isAuthenticated: !!token });
  },
}));
