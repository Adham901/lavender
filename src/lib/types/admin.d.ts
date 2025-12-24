export interface AdminUser {
  userId: number;
  name: string;
  email: string;
  username: string;
  isActive: number;
  avatar: string;
  roleName: string;
  phone?: string;
  address?: string;
}

export interface AdminUsersPagination {
  total: number;
  count: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
}

export interface AdminUsersResponse {
  success: boolean;
  message: string;
  data: {
    users: AdminUser[];
    pagination: AdminUsersPagination;
  };
}
