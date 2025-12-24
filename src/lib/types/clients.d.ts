// Client Item
export interface Client {
  clientId: number;
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
}

// Pagination
export interface ClientsPagination {
  total: number;
  count: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
}

// Full API Response
export interface ClientsResponse {
  success: boolean;
  message: string;
  data: {
    clients: Client[];
    pagination: ClientsPagination;
  };
}
