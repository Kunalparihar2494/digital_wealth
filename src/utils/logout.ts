import { resetAllStores } from "@/src/store/reset";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useAuthStore } from "../store/auth.store";
import { useUserStore } from "../store/user.store";

export const logout = async () => {
  resetAllStores();

  await AsyncStorage.removeItem("accessToken");

  // ❌ DO NOT delete SecureStore
  // ❌ DO NOT delete biometric user identity

  useAuthStore.getState().logout();
  useUserStore.getState().reset();

  router.replace("/(auth)/login");
};
