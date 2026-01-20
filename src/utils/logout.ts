import { resetAllStores } from "@/src/store/reset";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useAuthStore } from "../store/auth.store";
import { useUserStore } from "../store/user.store";
import { clearBiometric } from "./biometric";

export const logout = async () => {
  // 1️⃣ Clear Zustand
  resetAllStores();

  // 2️⃣ Clear storage
  await AsyncStorage.multiRemove(["token", "userData"]);

  // 3️⃣ Redirect
  await clearBiometric();
  await AsyncStorage.clear();
  useAuthStore.getState().logout();
  useUserStore.getState().reset();
  router.replace("/(auth)/login");
};
