'use server';

import { getToken } from '@/lib/utils/get-token.util';

type Payload = { name: string; price: string | number } | FormData;

export const addArea = async (payload: Payload) => {
  try {
    const token = await getToken();
    if (!token) throw new Error('No access token found');

    // build the FormData body (accept FormData or plain object)
    const body: FormData = payload instanceof FormData ? payload : new FormData();

    if (!(payload instanceof FormData)) {
      body.append('name', payload.name);

      body.append('price', String(payload.price));
    }

    const url = `${process.env.API_URL}/admin/areas`;
    console.log('ADD AREA URL =>', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json', // request JSON
        // IMPORTANT: do NOT set Content-Type when sending FormData
      },
      body,
    });

    const raw = await response.text();
    const contentType = response.headers.get('content-type') ?? '';

    // If JSON content-type -> parse normally
    if (contentType.includes('application/json')) {
      const data = JSON.parse(raw);
      if (!response.ok) throw new Error(data?.message || `Add failed (${response.status})`);
      return data;
    }

    // Try parse even if content-type is wrong
    try {
      const data = JSON.parse(raw);
      if (!response.ok) throw new Error(data?.message || `Add failed (${response.status})`);
      return data;
    } catch (err) {
      if (response.status === 401 || response.status === 302) {
        throw new Error('Unauthorized or redirected. Check token and API URL.');
      }

      throw new Error(
        `Server returned non-JSON response (${response.status}). See server logs / console for preview.`
      );
    }
  } catch (error: any) {
    throw new Error(error.message || 'Something went wrong');
  }
};
