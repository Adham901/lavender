'use server';

import { CategoriesApiResponse } from '@/lib/types/category';
import { getToken } from '@/lib/utils/get-token.util';

export async function getCategories(
  page: number = 1,
  search: string = ''
): Promise<CategoriesApiResponse> {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error('Unauthorized');
    }

    // build URL with server expected filter[search] param
    let url = `${process.env.API_URL}/admin/categories?page=${page}`;

    if (search && search.trim() !== '') {
      url += `&filter[search]=${encodeURIComponent(search.trim())}`;
    }

    // debug - check server logs for this
    console.log('getCategories URL ->', url);

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    return data as CategoriesApiResponse;
  } catch (err) {
    console.error('getCategories error:', err);
    throw err;
  }
}
