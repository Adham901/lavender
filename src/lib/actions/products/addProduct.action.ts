'use server';

import { getToken } from '@/lib/utils/get-token.util';

export async function addProduct(form: FormData | Record<string, any>) {
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

    // 🎯 تجهيز body
    const body = form instanceof FormData ? form : new FormData();

    // لو form كان object عادي
    if (!(form instanceof FormData)) {
      Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          body.append(key, value as any);
        }
      });
    }

    // 🔧 معالجة crossedPrice - بعت الصفر كما هو
    const crossedPrice = body.get('crossedPrice');
    if (crossedPrice === '' || crossedPrice === null || crossedPrice === undefined) {
      body.set('crossedPrice', '0');
    }

    // 🎯 دعم رفع عدة صور
    const images = body.getAll('images');

    body.delete('images'); // نمسح key علشان نحط الـ structure الجديد

    if (images.length > 0) {
      images.forEach((file, index) => {
        if (file instanceof File) {
          body.append(`productMedia[${index}][path]`, file);
          body.append(`productMedia[${index}][type]`, '0'); // صورة
          body.append(`productMedia[${index}][isMain]`, index === 0 ? '1' : '0');
        }
      });
    }
    body.append('isPromotion', '1');

    // API URL
    const url = `${process.env.API_URL}/admin/products`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body,
    });

    const text = await response.text();
    const contentType = response.headers.get('content-type') || '';

    // ❗ لو الريسبونس مش JSON
    if (!contentType.includes('application/json')) {
      return {
        success: false,
        message: `Non-JSON API response (status ${response.status})`,
        errors: null,
        status: response.status,
      };
    }

    const data = JSON.parse(text);

    // ❗ في حالة error من الـ API
    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Failed to add product',
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
      message: error.message || 'Something went wrong while adding product',
      errors: null,
      status: 500,
    };
  }
}
