'use server';

import { SubSlidersApiResponse } from '@/lib/types/slider';
import { getToken } from '@/lib/utils/get-token.util';

export async function getSubSliders(): Promise<SubSlidersApiResponse> {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error('Unauthorized');
    }

    const res = await fetch(`${process.env.API_URL}/admin/sub-sliders`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    const data: SubSlidersApiResponse = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    return data;
  } catch (err) {
    throw err;
  }
}
