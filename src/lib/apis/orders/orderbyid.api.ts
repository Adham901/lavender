'use server';

import { getToken } from '@/lib/utils/get-token.util';

export async function getOrderById(id: number) {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error('Unauthorized: No token found');
    }

    const res = await fetch(`${process.env.API_URL}/admin/orders/${id}`, {
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

    return data.data; // بيرجع بيانات الأوردر فقط
  } catch (err) {
    throw err;
  }
}
