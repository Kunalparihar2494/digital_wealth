export interface IWallet {
  success: boolean;
  balance: number;
}

export interface ITopUpData {
  amount: number | string;
  email: string;
}

export interface ITopUp {
  success: boolean;
  gatewayPayload: string;
  custRefNum: string;
  transactionId: number;
}
