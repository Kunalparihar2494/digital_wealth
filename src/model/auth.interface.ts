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

  // KYC
  kycstatus: string;

  // PAN
  pannumber: string;
  panstatus: boolean;

  // Aadhaar
  aadharnumber: string;
  aadharstatus: boolean;

  // Demat
  dematAccountNumber: string;

  // Verification
  isEmailVerified: boolean;
  isContactVerified: boolean;

  // Audit
  lastlogin: string;
  createdByUserId: number;
  createdDate: string;

  updatedByUserId: number | null;
  updatedDate: string | null;
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
