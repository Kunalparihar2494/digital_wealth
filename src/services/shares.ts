// src/services/shares.ts
import api from "./api";

export const getShares = async () => {
  try {
    // NOTE: confirm the endpoint path and case with your backend (e.g. "/Orders" vs "/orders").
    const res = await api.get("/Orders"); // Replace with your endpoint if needed
    return res.data;
  } catch (error: any) {
    // Log useful error details for debugging in native/Expo logs
    console.error("getShares error:", error.message || error);
    throw error;
  }
};
