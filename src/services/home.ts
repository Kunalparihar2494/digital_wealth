// src/services/shares.ts
import api from "./api";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL + `AppAccess`;

export const getDashboardDetails = async () => {
  try {
    // NOTE: confirm the endpoint path and case with your backend (e.g. "/Orders" vs "/orders").
    const res = await api.post(`${API_BASE_URL}/RetailDashboard`, {}); // Replace with your endpoint if needed
    return res.data;
  } catch (error: any) {
    // Log useful error details for debugging in native/Expo logs
    console.error("getDashboard detail error:", error.message || error);
    throw error;
  }
};
