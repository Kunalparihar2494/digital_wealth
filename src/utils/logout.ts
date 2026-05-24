import { resetAllStores } from "@/src/store/reset";
import { router } from "expo-router";
import { useAuthStore } from "../store/auth.store";
import { useUserStore } from "../store/user.store";

export const logout = async () => {
  resetAllStores();


  // ❌ DO NOT delete SecureStore
  // ❌ DO NOT delete biometric user identity

  await useAuthStore.getState().logout();
  useUserStore.getState().reset();

  router.replace("/(auth)/login");
};
