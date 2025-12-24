import { ClientsResponse } from '@/lib/types/clients';

export const getClients = async (
  page: number = 1,
  search: string = ''
): Promise<ClientsResponse> => {
  const params = new URLSearchParams();
  params.append('page', String(page));
  if (search) params.append('filter[search]', search);

  const response = await fetch(`/api/clients?${params.toString()}`, {
    cache: 'no-store',
  });

  if (!response.ok) throw new Error('Failed to fetch clients');

  return response.json();
};
