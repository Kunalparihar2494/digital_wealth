// src/services/auth.ts

import { LoginData, SignupData } from "../model/auth.interface";
import api from "./api";

export const loginUser = async ({ contact, pin }: LoginData) => {
  debugger;
  const res = await api.post(
    `/Applogin?MobileNumber=${contact}&password=${pin}`
  );
  return res.data;
};

export const signupUser = async (data: SignupData) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};
