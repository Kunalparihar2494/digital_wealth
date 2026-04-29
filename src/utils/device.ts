import * as Application from "expo-application";
import * as Crypto from "expo-crypto";
import { CryptoDigestAlgorithm } from "expo-crypto";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const DEVICE_ID_KEY = "app_device_id";

export async function getDeviceId(): Promise<string> {
  try {
    // WEB handling
    if (Platform.OS === "web") {
      let storedId = localStorage.getItem(DEVICE_ID_KEY);

      if (storedId) return storedId;

      const base = navigator.userAgent + Date.now();

      const hashed = await Crypto.digestStringAsync(
        CryptoDigestAlgorithm.SHA256,
        base,
      );

      localStorage.setItem(DEVICE_ID_KEY, hashed);
      return hashed;
    }

    // MOBILE handling
    const storedId = await SecureStore.getItemAsync(DEVICE_ID_KEY);
    if (storedId) return storedId;

    let base = "";

    if (Platform.OS === "android") {
      base = Application.getAndroidId() || "android-fallback";
    } else {
      base = (await Application.getIosIdForVendorAsync()) || "ios-fallback";
    }

    const hashed = await Crypto.digestStringAsync(
      CryptoDigestAlgorithm.SHA256,
      base + Date.now(),
    );

    await SecureStore.setItemAsync(DEVICE_ID_KEY, hashed);

    return hashed;
  } catch (error) {
    console.log("getDeviceId error:", error);
    return "fallback-device-id";
  }
}
