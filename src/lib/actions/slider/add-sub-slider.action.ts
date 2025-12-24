'use server';

import { getToken } from '@/lib/utils/get-token.util';

export async function addSubSlider(form: FormData) {
  try {
    const token = await getToken();
    if (!token) throw new Error('No access token found');

    const url = `${process.env.API_URL}/admin/sub-sliders`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    });

    const text = await response.text();
    const contentType = response.headers.get('content-type') || '';

    if (!contentType.includes('application/json')) {
      throw new Error(`Non-JSON API response (status ${response.status}).`);
    }

    const data = JSON.parse(text);

    if (!response.ok) {
      throw new Error(data.message || `Failed to add sub-slider (status ${response.status})`);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Something went wrong');
  }
}
