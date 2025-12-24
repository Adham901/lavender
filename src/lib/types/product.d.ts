// ==========================
// Product Media Type
// ==========================
export interface ProductMedia {
  productMediaId: number;
  path: string;
  type: number;
  isMain: number;
  productId: number;
}

// ==========================
// Product Type
// ==========================
export interface Product {
  productId: number;

  // ممكن يجيلك من API كـ string أو array من الميديا
  path: ProductMedia[] | string;

  // الميديا الإضافية (اللي سبب الخطأ)
  productMedia?: ProductMedia[];

  name: string;

  // بعض الـ APIs بترجعها string
  price: string;
  crossedPrice: string;

  status: number;
  isLimitedQuantity: number;
  isFreeShipping: number;

  description: string;

  // كميات المنتج
  qty: number; // API
  quantity: number; // form

  // بيانات إضافية
  cost?: string;

  categoryId: number | string;
  subCategoryId: number | string;

  unitType: number;

  // للرفع فقط وليس من الـ API
  image?: FileList;
}

// ==========================
// Pagination
// ==========================
export interface ProductsPagination {
  total: number;
  count: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
}

// ==========================
// Response Wrapper
// ==========================
export interface ProductsResponse {
  success: boolean;
  message: string;
  data: {
    products: Product[];
    pagination: ProductsPagination;
  };
}
