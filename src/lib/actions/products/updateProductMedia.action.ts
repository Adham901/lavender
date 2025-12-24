'use server';

import { getToken } from '@/lib/utils/get-token.util';

export async function updateProductMedia(id: number, form: FormData) {
  try {
    const token = await getToken();

    const body = form;
    body.append('_method', 'PUT');

    const url = `${process.env.API_URL}/admin/product-media/${id}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message,
        errors: data.errors ?? null,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    };
  }
}
