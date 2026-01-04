export interface IShare {
  shares: IShareDetail[];
  orders: any[];
  kycDetails: any;
  userName: string;
}

export interface IShareDetail {
  id: number;
  company: string;
  brandName: string;
  sector: string;
  isin: string;
  minQuantity: number | string;
  logo: string;
  price: number;
  logoFile: string;
  isActive: boolean;
  hotDealId?: number;
  hotDeal: any;
  blogId?: number;
  blog: any;
  onPress?: () => void;
}

export interface ICreateOrder {
  message: string;
  requiredAmount: number;
  success: boolean;
  walletBalance: number;
}
