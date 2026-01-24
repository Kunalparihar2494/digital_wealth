// src/utils/device.ts
import * as Application from "expo-application";
import * as Crypto from "expo-crypto";
import { CryptoDigestAlgorithm } from "expo-crypto";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const DEVICE_ID_KEY = "app_device_id";

export async function getDeviceId(): Promise<string> {
  // Try saved ID first
  const storedId = await SecureStore.getItemAsync(DEVICE_ID_KEY);
  if (storedId) return storedId;

  // Create new ID
  const raw =
    Platform.OS === "android"
      ? Application.getAndroidId
      : Application.getIosIdForVendorAsync();

  const base = typeof raw === "string" ? raw : String(await raw);

  const hashed = await Crypto.digestStringAsync(
    CryptoDigestAlgorithm.SHA256,
    base + Date.now()
  );

  await SecureStore.setItemAsync(DEVICE_ID_KEY, hashed);
  return hashed;
}
