import { resetAllStores } from "@/src/store/reset";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useAuthStore } from "../store/auth.store";
import { useUserStore } from "../store/user.store";

export const logout = async () => {
  resetAllStores();

  // ❌ DO NOT clear biometric
  await AsyncStorage.multiRemove(["accessToken", "userData"]);

  useAuthStore.getState().logout();
  useUserStore.getState().reset();

  router.replace("/(auth)/login");
};
