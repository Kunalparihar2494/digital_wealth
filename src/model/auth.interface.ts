export interface IUser {
  success: boolean;
  message: string;
  user: IUserDetail;
  token: string;
  refreshtoken: string;
  isBioMatricEnabled: string;
}

export interface IUserDetail {
  id: number;
  username: string;
  fullName: string;
  email: string;
  role: string;
  status: number;
  kycstatus: boolean;
  lastlogin: string;
  createdByUserId: number;
  isEmailVerified: boolean;
  isContactVerified: boolean;
  createdDate: string;
  updatedByUserId: any;
  updatedDate: any;
}

export interface LoginData {
  contact: string;
  pin: string;
  deviceId: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface IForgotPassword {
  contact: string;
  key?: string;
  OTP: string;
  password: string;
}
