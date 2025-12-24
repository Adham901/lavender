'use server';

import { CouponsApiResponse } from '@/lib/types/coupon';
import { getToken } from '@/lib/utils/get-token.util';

export async function getCoupons(): Promise<CouponsApiResponse> {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error('Unauthorized');
    }

    const res = await fetch(`${process.env.API_URL}/admin/coupons`, {
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

    return data;
  } catch (err) {
    throw err;
  }
}
