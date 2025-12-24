export interface StatsApiResponse {
  success: boolean;
  message: string;
  data: {
    totalOrders: {
      totalPrice: string;
      totalOrders: number;
    };
    draftOrderStats: {
      totalPrice: string;
      totalOrders: number;
    };
    totalClients: number;
    totalRevenue: {
      totalRevenue: string;
    };
    monthlyTotals: {
      [yearMonth: string]: string;
    };
  };
}
