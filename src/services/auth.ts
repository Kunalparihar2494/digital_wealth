import {
  IForgotPassword,
  LoginData,
  SignupData,
} from "../model/auth.interface";
import api from "./api";

const CLIENT_KEY = process.env.EXPO_PUBLIC_CLIENT_KEY;

export const loginUser = async ({ contact, pin, deviceId }: LoginData) => {
  deviceId = deviceId ?? "test";
  const res = await api.post(
    `/AppAccess/Applogin?MobileNumber=${contact}&password=${pin}&DeviceId=${deviceId}`,
    {
      contact,
      pin,
      deviceId,
    },
  );
  if (!res?.data) throw new Error("Login failed: no response data received.");
  return res.data;
};

export const signupUser = async (data: SignupData) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

export const sendOtp = async (data: string) => {
  const res = await api.post(`/OTP/GenerateNewUserOTP`, {
    contact: data,
    key: CLIENT_KEY,
  });
  return res.data;
};

export const verifyOtp = async (mobile: string, otp: string) => {
  const res = await api.post(`/OTP/verifyNewUser`, {
    contact: mobile,
    key: CLIENT_KEY,
    OTP: otp,
  });
  return res.data;
};

export const createAccount = async (payload: any) => {
  const res = await api.post(
    `/AppAccess/CreateAccount?key=${CLIENT_KEY}`,
    payload,
  );
  return res.data;
};

export const ForgetPasswordOTP = async (phone: string) => {
  const res = await api.post(`/AppAccess/ForgetPasswordOTP`, {
    contact: phone,
    key: CLIENT_KEY,
  });
  return res.data;
};

export const ForgotPasswordApi = async (data: IForgotPassword) => {
  const res = await api.post(`/AppAccess/forgotPassword`, {
    contact: data.contact,
    key: CLIENT_KEY,
    OTP: data.OTP,
    password: data.password,
  });
  return res.data;
};

export const refreshAccessToken = async (
  refreshToken: string,
  deviceId: string,
) => {
  const res = await api.post(`/AppAccess/refresh`, { refreshToken, deviceId });
  if (!res?.data)
    throw new Error("Token refresh failed: no response data received.");
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
