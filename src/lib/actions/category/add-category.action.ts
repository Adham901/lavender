'use server';

import { getToken } from '@/lib/utils/get-token.util';

export async function addCategory(
  form: FormData | { name: string; isActive: string | number; path?: File }
) {
  try {
    const token = await getToken();

    const body = form instanceof FormData ? form : new FormData();
    if (!(form instanceof FormData)) {
      body.append('name', form.name);
      body.append('isActive', String(form.isActive));
      if (form.path) body.append('path', form.path);
    }

    const url = `${process.env.API_URL}/admin/categories`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body,
    });

    const data = await response.json();

    if (!response.ok) {
      // ✅ Return error object instead of throwing
      return {
        success: false,
        message: data.message || 'Failed to add category',
        errors: data.errors || null,
        status: response.status,
      };
    }

    return {
      success: true,
      data: data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Something went wrong',
      errors: null,
      status: 500,
    };
  }
}
