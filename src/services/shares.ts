import { router } from "expo-router";
import api from "./api";

export const getShares = async () => {
  try {
    const res = await api.get("/AppAccess/allshares?includeFilters=false");
    // console.log("res share home page - ", res?.config?.data);
    // if (!res?.config?.data) router.replace("/(auth)/login");
    return res.data;
  } catch (error: any) {
    console.error("getShares error:", error?.message || error);
    if (error.response?.status === 401 || error.response?.status === 400) {
      router.replace("/(auth)/login");
    } else if (!error.response) {
      console.error("Network error or no response from server");
      router.replace("/(auth)/login");
    }

    throw error;
  }
};

export const buyShares = async (shareId: any, quantity: any) => {
  try {
    // ✅ Only endpoint path — baseURL is already set
    const res = await api.post(
      `/AppAccess/Buy?shareId=${shareId}&quantity=${quantity}`,
    );
    return res.data;
  } catch (error: any) {
    console.error("buy error:", error?.message || error);
    if (error.response?.status === 401 || error.response?.status === 400) {
      router.replace("/(auth)/login");
    } else if (!error.response) {
      console.error("Network error or no response from server");
    }

    throw error;
  }
};

export const holdingApi = async () => {
  try {
    // ✅ Only endpoint path — baseURL is already set
    const res = await api.get(`/AppAccess/RetailHoldings`);
    return res.data;
  } catch (error: any) {
    console.error("holding error:", error?.message || error);
    if (error.response?.status === 401 || error.response?.status === 400) {
      router.replace("/(auth)/login");
    } else if (!error.response) {
      console.error("Network error or no response from server");
    }

    throw error;
  }
};
