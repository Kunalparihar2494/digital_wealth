import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,

  setAuth: async (token) => {
    await AsyncStorage.setItem("token", token);
    set({ token, isAuthenticated: true });
  },

  logout: async () => {
    await AsyncStorage.clear();
    set({ token: null, isAuthenticated: false });
  },
}));
