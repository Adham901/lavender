'use server';

import { OrdersApiResponse } from '@/lib/types/order';
import { getToken } from '@/lib/utils/get-token.util';

export async function getOrders(page: number = 1, search: string = ''): Promise<OrdersApiResponse> {
  try {
    const token = await getToken();
    if (!token) throw new Error('Unauthorized');

    let url = `${process.env.API_URL}/admin/orders?page=${page}`;

    if (search && search.trim() !== '') {
      // فقط search برقم الأوردر
      url += `&filter[number]=${encodeURIComponent(search.trim())}`;
    }

    console.log('getOrders URL ->', url);

    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) throw new Error(`API Error: ${res.status}`);

    return data as OrdersApiResponse;
  } catch (err) {
    console.error('getOrders error:', err);
    throw err;
  }
}
