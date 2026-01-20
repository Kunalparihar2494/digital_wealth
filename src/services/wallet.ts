// src/services/wallet.ts
import { router } from "expo-router";
import { ITopUpData } from "../model/wallet.interface";
import api from "./api";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL + `AppAccess`;

export const getWalletBalance = async () => {
  try {
    // NOTE: confirm the endpoint path and case with your backend (e.g. "/Orders" vs "/orders").
    const res = await api.get(API_BASE_URL + `/balance`); // Replace with your endpoint if needed
    return res.data;
  } catch (error: any) {
    // Log useful error details for debugging in native/Expo logs
    console.error("get balance error:", error.message || error);
    if (error.response?.status === 401) {
      router.replace("/(auth)/login");
    }
    throw error;
  }
};

export const topUpBalance = async (data: ITopUpData) => {
  try {
    // NOTE: confirm the endpoint path and case with your backend (e.g. "/Orders" vs "/orders").
    const res = await api.post(API_BASE_URL + `/topup`, data); // Replace with your endpoint if needed
    return res;
  } catch (error: any) {
    // Log useful error details for debugging in native/Expo logs
    console.error("get balance error:", error.message || error);
    if (error.response?.status === 401) {
      router.replace("/(auth)/login");
    }
    throw error;
  }
};

export const getTransactions = async () => {
  try {
    // ✅ Only endpoint path — baseURL is already set
    const res = await api.get("/AppAccess/transactions");
    return res.data;
  } catch (error: any) {
    console.error("transaction error:", error?.message || error);
    if (error.response?.status === 401) {
      router.replace("/(auth)/login");
    }

    throw error; // ❌ do NOT redirect here
  }
};

export const getPaymentStatus = async (customerReference: string) => {
  try {
    // ✅ Only endpoint path — baseURL is already set
    const res = await api.get(
      `/AppAccess/Paymentstatus?custRefNum=${customerReference}`
    );
    return res.data;
  } catch (error: any) {
    console.error("payment error:", error?.message || error);
    if (error.response?.status === 401) {
      router.replace("/(auth)/login");
    }

    throw error; // ❌ do NOT redirect here
  }
};

export const withdrawRequest = async (amount: number) => {
  try {
    // ✅ Only endpoint path — baseURL is already set
    const res = await api.post(`/AppAccess/RequestWithdrawal?amount=${amount}`);
    return res.data;
  } catch (error: any) {
    console.error("withdraw error:", error?.message || error);
    if (error.response?.status === 401) {
      router.replace("/(auth)/login");
    }

    throw error; // ❌ do NOT redirect here
  }
};
