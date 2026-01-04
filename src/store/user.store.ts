import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { IUserDetail } from "../model/auth.interface";
import { registerReset } from "./reset";

type UserState = {
  user?: IUserDetail;
  setUser: (user: IUserDetail) => Promise<void>;
  loadUser: () => Promise<void>;
  clearUser: () => Promise<void>;
  reset: () => void;
};

export const useUserStore = create<UserState>((set) => {
  const reset = () =>
    set({
      user: undefined,
    });

  // ✅ register reset
  registerReset(reset);
  return {
    user: undefined,

    setUser: async (user) => {
      await AsyncStorage.setItem("userData", JSON.stringify(user));
      set({ user });
    },

    loadUser: async () => {
      const data = await AsyncStorage.getItem("userData");
      if (data) {
        set({ user: JSON.parse(data) });
      }
    },

    clearUser: async () => {
      await AsyncStorage.removeItem("userData");
      set({ user: undefined });
    },

    reset,
  };
});
