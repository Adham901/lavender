'use server';

import { Category } from '@/lib/types/category';
import { getToken } from '@/lib/utils/get-token.util';

export async function getCategoryById(id: number): Promise<Category> {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error('Unauthorized: No token found');
    }

    const res = await fetch(`${process.env.API_URL}/admin/categories/${id}`, {
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

    return data.data as Category;
  } catch (err) {
    throw err;
  }
}
