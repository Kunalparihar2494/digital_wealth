import { router } from "expo-router";
import api from "./api";

export const deleteUser = async () => {
  try {
    // ✅ Only endpoint path — baseURL is already set
    const res = await api.get("/AppAccess/DeleteAccount");
    return res.data;
  } catch (error: any) {
    console.error("getShares error:", error?.message || error);
    if (error.response?.status === 401) {
      router.replace("/(auth)/login");
    }

    throw error; // ❌ do NOT redirect here
  }
};
