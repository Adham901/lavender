'use server';

import { getToken } from '@/lib/utils/get-token.util';

export async function updateCategory(
  id: number,
  form: FormData | { name: string; isActive: string | number; path?: File }
) {
  try {
    const token = await getToken();
    if (!token) throw new Error('No access token found');

    const body = form instanceof FormData ? form : new FormData();

    // ⬅️⬅️ المهم هنا: لازم نحط _method = PUT بالظبط زي Postman
    body.append('_method', 'PUT');

    if (!(form instanceof FormData)) {
      body.append('name', form.name);
      body.append('isActive', String(form.isActive));
      if (form.path) body.append('path', form.path);
    }

    const url = `${process.env.API_URL}/admin/categories/${id}`;

    const response = await fetch(url, {
      method: 'POST', // ⬅️ مهم: خليها POST لأن انت بتعمل override بـ _method
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    const text = await response.text();
    const contentType = response.headers.get('content-type') || '';

    if (!contentType.includes('application/json')) {
      console.error('Non-JSON response:', text);
      throw new Error(`Non-JSON API response (status ${response.status}).`);
    }

    const data = JSON.parse(text);

    if (!response.ok) {
      throw new Error(data.message || `Failed to update category (status ${response.status})`);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Something went wrong');
  }
}
