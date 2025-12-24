'use server';

import { AreasApiResponse } from '@/lib/types/areas';
import { getToken } from '@/lib/utils/get-token.util';

export async function getAreas(): Promise<AreasApiResponse> {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error('Unauthorized');
    }

    const res = await fetch(`${process.env.API_URL}/admin/areas`, {
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

    return data as AreasApiResponse;
  } catch (err) {
    throw err;
  }
}
