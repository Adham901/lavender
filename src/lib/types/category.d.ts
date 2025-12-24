// src/lib/types/categories.ts

export interface Category {
  categoryId: number;
  name: string;
  isActive: number;
  path: string;
  productCount: number;
}

export interface CategoriesPagination {
  total: number;
  count: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
}

export interface CategoriesData {
  categories: Category[];
  pagination: CategoriesPagination;
}

export interface CategoriesApiResponse {
  success: boolean;
  message: string;
  data: CategoriesData;
}
