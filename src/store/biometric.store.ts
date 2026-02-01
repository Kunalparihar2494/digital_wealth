import * as SecureStore from "expo-secure-store";

export const BIOMETRIC_REFRESH_TOKEN_KEY = "biometric_refresh_token";
export const BIOMETRIC_USER_KEY = "biometric_user";
export const BIOMETRIC_DEVICE_KEY = "biometric_device";
export const BIOMETRIC_ENABLED_KEY = "biometric_enabled";

export async function saveBiometricData({
  refreshToken,
  username,
  deviceId,
}: {
  refreshToken: string;
  username: string;
  deviceId: string;
}) {
  console.log("secure calling");
  await SecureStore.setItemAsync(BIOMETRIC_REFRESH_TOKEN_KEY, refreshToken);
  await SecureStore.setItemAsync(
    BIOMETRIC_USER_KEY,
    JSON.stringify({ username }),
  );
  await SecureStore.setItemAsync(BIOMETRIC_DEVICE_KEY, deviceId);
  await SecureStore.setItemAsync(BIOMETRIC_ENABLED_KEY, "true");
}

export async function getBiometricData() {
  const enabled = await SecureStore.getItemAsync(BIOMETRIC_ENABLED_KEY);
  if (enabled !== "true") return null;

  const refreshToken = await SecureStore.getItemAsync(
    BIOMETRIC_REFRESH_TOKEN_KEY,
  );
  const userRaw = await SecureStore.getItemAsync(BIOMETRIC_USER_KEY);
  const deviceId = await SecureStore.getItemAsync(BIOMETRIC_DEVICE_KEY);

  if (!refreshToken || !userRaw || !deviceId) return null;

  return {
    refreshToken,
    Contact: JSON.parse(userRaw).username,
    deviceId,
  };
}
