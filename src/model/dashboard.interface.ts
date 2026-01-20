// export interface IDashboard {
//   userName: string;
//   isKycIncomplete: boolean;
//   totalOrders?: number;
//   totalAmount?: number;
//   pendingOrders?: number;
//   confirmedOrders?: number;
//   cancelledOrders?: number;
//   recentOrders?: IRecentOrder[];
//   orders?: IOrder[];
//   hotDeal?: any;
// }

export interface IRecentOrder {
  id: number;
  shareId: number;
  shareName: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  quantity: number;
}

export interface IOrder {
  id: number;
  shareId: number;
  shareName: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  quantity: number;
}

export interface IDashboard {
  inProgressOrders: InProgressOrder[];
  completedOrders: CompletedOrder[];
  rejectedOrders: any[];
  hotDeal: any;
}

export interface InProgressOrder {
  id: number;
  shareId: number;
  shareName: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  quantity: number;
}

export interface CompletedOrder {
  id: number;
  shareId: number;
  shareName: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  quantity: number;
}
