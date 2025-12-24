'use server';

import { getToken } from '@/lib/utils/get-token.util';

export async function updateArea(id: number, form: FormData) {
  try {
    const token = await getToken();
    if (!token) throw new Error('No access token found');

    form.append('_method', 'PUT');

    const url = `${process.env.API_URL}/admin/areas/${id}`;

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
      console.error('Non-JSON response:', text);
      throw new Error(`Non JSON response (status ${response.status})`);
    }

    const data = JSON.parse(text);

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update area');
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Something went wrong');
  }
}
