import { create } from "zustand";
import { IHoldingShares, IShare } from "../model/shares.interface";
import { getShares, holdingApi } from "../services/shares";
import { registerReset } from "./reset";

type SharesState = {
  data?: IShare;
  loading: boolean;
  fetchShares: () => Promise<void>;
};

type HoldingState = {
  holdingData?: IHoldingShares[];
  holdingLoading: boolean;
  fetchHoldings: () => Promise<void>;
};

export const useShareStore = create<SharesState>((set) => ({
  data: undefined,
  loading: false,

  fetchShares: async () => {
    set({ loading: true });
    try {
      const data = await getShares();
      set({ data });
    } finally {
      set({ loading: false });
    }
  },
}));

export const useHoldingState = create<HoldingState>((set) => {
  const reset = () =>
    set({
      holdingData: undefined,
      holdingLoading: false,
    });

  // ✅ register reset
  registerReset(reset);
  return {
    holdingData: undefined,
    holdingLoading: false,
    fetchHoldings: async () => {
      set({ holdingLoading: true });
      try {
        const holdingData = await holdingApi();
        set({ holdingData });
      } finally {
        set({ holdingLoading: false });
      }
    },
    reset,
  };
});
