import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import api from "./api";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const getShares = async (filterId = 0) => {
  const id = filterId;
  const isFilter = true;
  // const shareUrl =
  //   API_BASE_URL +
  //   `AppAccess/allshares?includeFilters=${isFilter}&filterId=${id}`;
  try {
    const res = await api.get(
      `/AppAccess/allshares?includeFilters=${isFilter}&filterId=${id}`,
    );

    const responseData = res?.data;
    // console.log("resposen data - ", responseData);
    // ✅ Detect webpage / login HTML response
    if (
      typeof responseData?.message === "string" &&
      (responseData?.message.includes("<html") ||
        responseData?.message.includes("<!DOCTYPE") ||
        responseData?.message.toLowerCase().includes("login") ||
        responseData?.message
          .toLowerCase()
          .includes("your session has expired"))
    ) {
      console.warn("Session expired. Logging out...");

      // Clear storage
      await AsyncStorage.multiRemove([
        "accessToken",
        "refreshToken",
        "userData",
      ]);

      // Redirect to login
      router.replace("/(auth)/login");

      return;
    }

    return responseData;
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
      {
        shareId,
        quantity,
      },
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
