import { create } from "zustand";
import { IDashboard } from "../model/dashboard.interface";
import { getDashboardDetails } from "../services/home";

type DashboardState = {
  data?: IDashboard;
  loading: boolean;
  fetchDashboard: () => Promise<void>;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  data: undefined,
  loading: false,

  fetchDashboard: async () => {
    set({ loading: true });
    try {
      const data = await getDashboardDetails();
      set({ data });
    } finally {
      set({ loading: false });
    }
  },
}));
