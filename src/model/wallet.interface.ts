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

export interface ITransactionRoot {
  success: boolean;
  page: number;
  pageSize: number;
  transactions: ITransaction[];
}

export interface ITransaction {
  id: number;
  amount: number;
  createdAt: string;
  type: string;
  description: string;
  note: string;
  status: string;
  statusColor: string;
  reference: string;
}

export interface IPayment {
  success: boolean;
  status: string;
}

export interface IWithdrawReq {
  success: boolean;
  message: string;
  requestId: number;
}
