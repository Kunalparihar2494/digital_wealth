export interface IDashboard {
  userName: string;
  isKycIncomplete: boolean;
  totalOrders?: number;
  totalAmount?: number;
  pendingOrders?: number;
  confirmedOrders?: number;
  cancelledOrders?: number;
  recentOrders?: any[];
  orders?: any[];
  hotDeal?: any;
}
