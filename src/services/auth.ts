// src/services/auth.ts

import { LoginData, SignupData } from "../model/auth.interface";
import api from "./api";
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const appAccess = API_BASE_URL + `AppAccess`;

export const loginUser = async ({ contact, pin }: LoginData) => {
  const res = await api.post(
    appAccess + `/Applogin?MobileNumber=${contact}&password=${pin}`
  );
  return res.data;
};

export const signupUser = async (data: SignupData) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

export const sendOtp = async (data: string) => {
  const obj = {
    contact: data,
    key: process.env.EXPO_PUBLIC_CLIENT_KEY,
  };

  const res = await api.post(`${API_BASE_URL}OTP/GenerateNewUserOTP`, obj, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

export const verifyOtp = async (mobile: string, otp: string) => {
  const res = await api.post(`${API_BASE_URL}OTP/verifyNewUser`, {
    contact: mobile,
    key: process.env.EXPO_PUBLIC_CLIENT_KEY,
    OTP: otp,
  });

  return res.data;
};

export const createAccount = async (payload: any) => {
  const key = process.env.EXPO_PUBLIC_CLIENT_KEY;

  const res = await api.post(
    `${API_BASE_URL}AppAccess/CreateAccount?key=${key}`,
    payload
  );

  return res.data;
};
