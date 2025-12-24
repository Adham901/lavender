export interface Coupon {
  couponId: number;
  code: string;
  type: 'percentage' | 'fixed'; // حسب API لو في types تانية ضيفها
  value: string;
  minOrderAmount: string;
  maxDiscount: string;
  usageLimit: number;
  usedCount: number;
  perUserLimit: number;
  startsAt: string;
  expiresAt: string;
  isActive: boolean;
}

export interface CouponPagination {
  total: number;
  count: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
}

export interface CouponsApiResponse {
  success: boolean;
  message: string;
  data: {
    coupons: Coupon[];
    pagination: CouponPagination;
  };
}
