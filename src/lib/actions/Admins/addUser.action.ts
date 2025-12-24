'use server';

import { getToken } from '@/lib/utils/get-token.util';

export async function addUser(form: FormData | Record<string, any>) {
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

    // تجهيز الـ FormData
    const body = form instanceof FormData ? form : new FormData();
    if (!(form instanceof FormData)) {
      Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          body.append(key, value as any);
        }
      });
    }

    // ✅ Always set roleId to 1 (override any value sent)
    body.set('roleId', '1');

    const url = `${process.env.API_URL}/admin/users`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    const text = await response.text();
    const contentType = response.headers.get('content-type') || '';

    if (!contentType.includes('application/json')) {
      return {
        success: false,
        message: `Non-JSON API response (status ${response.status})`,
        errors: null,
        status: response.status,
      };
    }

    const data = JSON.parse(text);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Failed to add user',
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
      message: error.message || 'Something went wrong while adding user',
      errors: null,
      status: 500,
    };
  }
}
