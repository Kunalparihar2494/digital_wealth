// src/utils/biometric.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { REFRESH_TOKEN_KEY } from "./tokenKeys";

export async function isBiometricAvailable() {
  return (
    (await LocalAuthentication.hasHardwareAsync()) &&
    (await LocalAuthentication.isEnrolledAsync())
  );
}

export async function enableBiometric(refreshToken: string) {
  await AsyncStorage.setItem("refreshToken", refreshToken);
}

export async function biometricLogin(): Promise<string | null> {
  const available = await isBiometricAvailable();
  if (!available) return null;

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Login using Biometrics",
    fallbackLabel: "Use PIN",
  });

  if (!result.success) return null;

  return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
}

export async function clearBiometric() {
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}
