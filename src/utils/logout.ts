import { resetAllStores } from "@/src/store/reset";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const logout = async () => {
  // 1️⃣ Clear Zustand
  resetAllStores();

  // 2️⃣ Clear storage
  await AsyncStorage.multiRemove(["token", "userData"]);

  // 3️⃣ Redirect
  router.replace("/(auth)/login");
};
