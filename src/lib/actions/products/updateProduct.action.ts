'use server';

import { getToken } from '@/lib/utils/get-token.util';

export async function updateProduct(id: number, form: FormData | Record<string, any>) {
  try {
    const token = await getToken();
    if (!token) {
      return {
        success: false,
        message: 'No access token found',
        errors: null,
        status: 401,
      };
    }

    // نفس معالجة الـ body زي addProduct
    const body = form instanceof FormData ? form : new FormData();

    // لو form كان object عادي
    if (!(form instanceof FormData)) {
      Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          body.append(key, value as any);
        }
      });
    }

    // Laravel override
    body.append('_method', 'PUT');

    // 🔥 نفس اللي في addProduct
    const crossedPrice = body.get('crossedPrice');
    if (!crossedPrice) {
      body.set('crossedPrice', '0');
    }

    // 🔥 نفس طريقة رفع الصور
    const images = body.getAll('images') ?? [];

    body.delete('images');

    if (images.length > 0) {
      images.forEach((file, index) => {
        if (file instanceof File) {
          body.append(`productMedia[${index}][path]`, file);
          body.append(`productMedia[${index}][type]`, '0');
          body.append(`productMedia[${index}][isMain]`, index === 0 ? '1' : '0');
        }
      });
    }

    // 🔥 لازم تبعت isPromotion زي addProduct
    if (!body.get('isPromotion')) {
      body.append('isPromotion', '1');
    }

    const url = `${process.env.API_URL}/admin/products/${id}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body,
    });

    const text = await response.text();
    const contentType = response.headers.get('content-type') || '';

    if (!contentType.includes('application/json')) {
      return {
        success: false,
        message: `Non JSON response (status ${response.status})`,
        errors: null,
        status: response.status,
      };
    }

    const data = JSON.parse(text);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Failed to update product',
        errors: data.errors || null,
        status: response.status,
      };
    }

    return {
      success: true,
      data,
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
