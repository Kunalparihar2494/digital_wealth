import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";

export const BIOMETRIC_TOKEN_KEY = "biometric_refresh_token";
export const BIOMETRIC_ENABLED_KEY = "biometric_enabled";

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

/**
 * Called when user taps fingerprint
 */
export async function biometricLogin(): Promise<string | null> {
  const enabled = await SecureStore.getItemAsync(BIOMETRIC_ENABLED_KEY);
  if (enabled !== "true") return null;

  const auth = await LocalAuthentication.authenticateAsync({
    promptMessage: "Login using biometrics",
    fallbackLabel: "Use PIN",
  });

  if (!auth.success) return null;

  return await SecureStore.getItemAsync(BIOMETRIC_TOKEN_KEY);
}
