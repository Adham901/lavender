export interface Order {
  orderId: number;
  orderNumber: string;
  clientName: string;
  status: number; // 0 = pending, 1 = completed مثلاً
  discountType: number; // 0 = none, 1 = percentage, 2 = fixed
  discount: string;
  price: string;
  totalOrderCost: string;
  priceAfterDiscount: string;
  totalOrderItems: number;
  date: string; // "10/11/2025"
}

export interface Pagination {
  total: number;
  count: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
}

export interface OrdersResponseData {
  orders: Order[];
  pagination: Pagination;
}

export interface OrdersApiResponse {
  success: boolean;
  message: string;
  data: OrdersResponseData;
}
