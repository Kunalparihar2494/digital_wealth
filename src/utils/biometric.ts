import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { BIOMETRIC_ENABLED_KEY, BIOMETRIC_TOKEN_KEY } from "./user.constant";

export async function isBiometricAvailable() {
  const compatible = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();
  return compatible && enrolled;
}

export async function enableBiometric(token: string) {
  await SecureStore.setItemAsync(BIOMETRIC_TOKEN_KEY, token);
  await SecureStore.setItemAsync(BIOMETRIC_ENABLED_KEY, "true");
}

export async function biometricLogin(): Promise<string | null> {
  const enabled = await SecureStore.getItemAsync(BIOMETRIC_ENABLED_KEY);
  if (!enabled) {
    return null;
  }

  const compatible = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();

  if (!compatible || !enrolled) {
    throw new Error("Biometric not available");
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Login with Biometrics",
    fallbackLabel: "Use PIN",
  });

  if (!result.success) {
    throw new Error("Authentication failed");
  }

  return await SecureStore.getItemAsync(BIOMETRIC_TOKEN_KEY);
}

export async function clearBiometric() {
  await SecureStore.deleteItemAsync(BIOMETRIC_ENABLED_KEY);
  await SecureStore.deleteItemAsync(BIOMETRIC_TOKEN_KEY);
}
