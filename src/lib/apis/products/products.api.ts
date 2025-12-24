import { ProductsResponse } from '@/lib/types/product';

export const getProducts = async (
  page: number = 1,
  search: string = ''
): Promise<ProductsResponse> => {
  const params = new URLSearchParams();
  params.append('page', String(page));
  if (search) params.append('filter[search]', search);

  const response = await fetch(`/api/products?${params.toString()}`, { cache: 'no-store' });

  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};
