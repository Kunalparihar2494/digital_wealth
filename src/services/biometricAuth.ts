import * as LocalAuthentication from "expo-local-authentication";

export async function authenticateBiometric() {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  if (!hasHardware) return { success: false, error: "Biometric not supported" };

  const enrolled = await LocalAuthentication.isEnrolledAsync();
  if (!enrolled) return { success: false, error: "No biometrics enrolled" };

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Login with biometrics",
    fallbackLabel: "Use PIN",
  });

  return result;
}
