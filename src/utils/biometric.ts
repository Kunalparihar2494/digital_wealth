import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { BIOMETRIC_ENABLED_KEY, BIOMETRIC_TOKEN_KEY } from "./user.constant";

export async function isBiometricAvailable() {
  return (
    (await LocalAuthentication.hasHardwareAsync()) &&
    (await LocalAuthentication.isEnrolledAsync())
  );
}

/**
 * Enable biometric AFTER PIN login
 */
export async function enableBiometric(refreshToken: string): Promise<boolean> {
  const available = await isBiometricAvailable();
  if (!available) return false;

  const auth = await LocalAuthentication.authenticateAsync({
    promptMessage: "Confirm biometric login",
    cancelLabel: "Cancel",
  });

  if (!auth.success) return false;

  await SecureStore.setItemAsync(BIOMETRIC_TOKEN_KEY, refreshToken);
  await SecureStore.setItemAsync(BIOMETRIC_ENABLED_KEY, "true");

  return true;
}
