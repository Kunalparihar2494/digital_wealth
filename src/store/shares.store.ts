import { create } from "zustand";
import { IShare } from "../model/shares.interface";
import { getShares } from "../services/shares";

type SharesState = {
  data?: IShare;
  loading: boolean;
  fetchShares: () => Promise<void>;
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
