// src/services/auth.ts

import {
  IForgotPassword,
  LoginData,
  SignupData,
} from "../model/auth.interface";
import api from "./api";
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const appAccess = API_BASE_URL + `AppAccess`;

export const loginUser = async ({ contact, pin, deviceId }: LoginData) => {
  deviceId = deviceId ?? "test";
  const url =
    appAccess +
    `/Applogin?MobileNumber=${contact}&password=${pin}&DeviceId=${deviceId}`;
  console.log("Login Url: ", url);
  const res = await api.post(url);
  console.log("URL - ", API_BASE_URL);
  // const res = await api.post(`${appAccess}/Applogin`, {
  //   contact,
  //   pin,
  //   deviceId,
  // });
  if (!res?.data) {
    throw new Error("Login failed: no response data received.");
  }
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
  const newOtpUrl = `${API_BASE_URL}OTP/GenerateNewUserOTP`;
  const res = await api.post(newOtpUrl, obj, {
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
    payload,
  );
  return res.data;
};

export const ForgetPasswordOTP = async (phone: string) => {
  const obj = {
    contact: phone,
    key: process.env.EXPO_PUBLIC_CLIENT_KEY,
  };

  const res = await api.post(`/AppAccess/ForgetPasswordOTP`, obj, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

export const ForgotPasswordApi = async (data: IForgotPassword) => {
  const obj = {
    contact: data.contact,
    key: process.env.EXPO_PUBLIC_CLIENT_KEY,
    OTP: data.OTP,
    password: data.password,
  };

  const res = await api.post(`/AppAccess/forgotPassword`, obj, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

export const refreshAccessToken = async (
  refreshToken: string,
  deviceId: string,
) => {
  const refreshUrl = `${appAccess}/refresh`;
  const res = await api.post(refreshUrl, {
    refreshToken,
    deviceId,
  });
  if (!res?.data) {
    throw new Error("Token refresh failed: no response data received.");
  }
  return res.data;
};

export const confirmBiometricLogin = async (
  refreshToken: string,
  deviceId: string,
) => {
  const res = await api.post("/AppAccess/confirm-biometric-login", {
    refreshToken,
    deviceId,
  });
  return res.data;
};
