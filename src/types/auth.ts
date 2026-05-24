export interface SignupPayload {
  FullName: string;
  Contact: string;
  Password: string;
  ConfirmPassword: string;
  PartnerId: number;
  Email: string;
  Role: "Retail" | "Partner";
}

export interface LoginPayload {
  contact: string;
  pin: string;
  deviceId?: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
