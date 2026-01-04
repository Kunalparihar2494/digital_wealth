import { router } from "expo-router";
import api from "./api";

export const getShares = async () => {
  try {
    // ✅ Only endpoint path — baseURL is already set
    const res = await api.get("/AppAccess/allshares");
    return res.data;
  } catch (error: any) {
    console.error("getShares error:", error?.message || error);
    if (error.response?.status === 401) {
      router.replace("/(auth)/login");
    }

    throw error; // ❌ do NOT redirect here
  }
};

export const buyShares = async (shareId: any, quantity: any) => {
  try {
    // ✅ Only endpoint path — baseURL is already set
    const res = await api.post(
      `/AppAccess/Buy?shareId=${shareId}&quantity=${quantity}`
    );
    return res.data;
  } catch (error: any) {
    console.error("buy error:", error?.message || error);
    if (error.response?.status === 401) {
      router.replace("/(auth)/login");
    }

    throw error; // ❌ do NOT redirect here
  }
};
