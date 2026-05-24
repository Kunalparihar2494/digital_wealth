import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthService } from "@/src/services/auth-service";
import { useAuthStore } from "@/src/store/auth.store";

export default function Index() {
  const [isInitializing, setIsInitializing] = useState(true);
  const { isAuthenticated, initializeAuth } = useAuthStore();

  useEffect(() => {
    const initialize = async () => {
      try {
        await initializeAuth();
        await AuthService.refreshTokenIfNeeded();
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setIsInitializing(false);
      }
    };

    initialize();
  }, [initializeAuth]);

  if (isInitializing) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <Redirect href={isAuthenticated ? "/(tabs)/home" : "/(auth)/login"} />
  );
}
