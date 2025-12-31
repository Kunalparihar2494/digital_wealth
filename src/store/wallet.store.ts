import { create } from "zustand";
import { ITopUp, ITopUpData, IWallet } from "../model/wallet.interface";
import { getWalletBalance, topUpBalance } from "../services/wallet";
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
        const topupData = await topUpBalance(userData);
        console.log("topup data-", topupData);
        set({ topupData });
      } finally {
        set({ loading: false });
      }
    },
  };
});
