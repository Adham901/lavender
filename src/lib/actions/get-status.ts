'use server';

import { StatsApiResponse } from '@/lib/types/stats';
import { getToken } from '@/lib/utils/get-token.util';

export async function getStats(): Promise<StatsApiResponse> {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error('Unauthorized');
    }

    const res = await fetch(`${process.env.API_URL}/admin/stats`, {
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

    return data as StatsApiResponse;
  } catch (err) {
    throw err;
  }
}
