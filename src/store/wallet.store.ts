import { create } from "zustand";
import {
  IPayment,
  ITopUp,
  ITopUpData,
  ITransactionRoot,
  IWallet,
} from "../model/wallet.interface";
import {
  getPaymentStatus,
  getTransactions,
  getWalletBalance,
  topUpBalance,
} from "../services/wallet";
import { registerReset } from "./reset";

type WalletState = {
  data?: IWallet;
  loading: boolean;
  fetchBalance: () => Promise<void>;
  reset: () => void;
};

type TopupState = {
  topupData?: ITopUp;
  loading: boolean;
  fetchTopUpStatus: (userData: ITopUpData) => Promise<void>;
};

type TransactionState = {
  transactionData?: ITransactionRoot;
  transactionLoading: boolean;
  fetchTransactions: () => Promise<void>;
  reset: () => void;
};

type PaymentState = {
  paymentData?: IPayment;
  paymentStatusLoading: boolean;
  fetchPaymentStatus: (customerReference: string) => Promise<void>;
  reset: () => void;
};

export const useWalletStore = create<WalletState>((set) => {
  const reset = () =>
    set({
      data: undefined,
      loading: false,
    });

  // ✅ register reset
  registerReset(reset);

  return {
    data: undefined,
    loading: false,

    fetchBalance: async () => {
      set({ loading: true });
      try {
        const data = await getWalletBalance();
        set({ data });
      } finally {
        set({ loading: false });
      }
    },
    reset: () => set({ data: undefined, loading: false }),
  };
});

export const useWalletTopUpStatus = create<TopupState>((set) => {
  const reset = () =>
    set({
      topupData: undefined,
      loading: false,
    });

  // ✅ register reset
  registerReset(reset);
  return {
    data: undefined,
    loading: false,

    fetchTopUpStatus: async (userData) => {
      set({ loading: true });

      try {
        const res = await topUpBalance(userData);
        set({ topupData: res.data, loading: false });

        return res.data; // ✅ RETURN DATA
      } catch (e) {
        set({ loading: false });
        throw e;
      }
    },
  };
});

export const useTransactionStore = create<TransactionState>((set) => {
  const reset = () =>
    set({
      transactionData: undefined,
      transactionLoading: undefined,
    });

  // ✅ register reset
  registerReset(reset);
  return {
    transactionData: undefined,
    transactionLoading: false,
    fetchTransactions: async () => {
      set({ transactionLoading: true });
      try {
        const transactionData = await getTransactions();
        set({ transactionData });
      } finally {
        set({ transactionLoading: false });
      }
    },
    reset,
  };
});

export const usePaymentStatusCheck = create<PaymentState>((set) => {
  const reset = () =>
    set({
      paymentData: undefined,
      paymentStatusLoading: undefined,
    });

  // ✅ register reset
  registerReset(reset);
  return {
    paymentData: undefined,
    paymentStatusLoading: false,
    fetchPaymentStatus: async (customerReference: string) => {
      set({ paymentStatusLoading: true });
      try {
        const paymentData = await getPaymentStatus(customerReference);
        set({ paymentData });
        return paymentData;
      } finally {
        set({ paymentStatusLoading: false });
      }
    },
    reset,
  };
});
