'use server';

import { getToken } from '@/lib/utils/get-token.util';

export async function editUser(
  id: number,
  form:
    | FormData
    | {
        name?: string;
        username?: string;
        email?: string;
        password?: string;
        password_confirmation?: string;
        isActive?: string | number;
      }
) {
  try {
    const token = await getToken();
    if (!token) throw new Error('No access token found');

    const body = form instanceof FormData ? form : new FormData();

    // ⬅️ override method PUT
    body.append('_method', 'PUT');

    if (!(form instanceof FormData)) {
      if (form.name) body.append('name', form.name);
      if (form.username) body.append('username', form.username);
      if (form.email) body.append('email', form.email);
      if (form.password) body.append('password', form.password);

      if (form.isActive !== undefined) body.append('isActive', String(form.isActive));
    }

    // ✅ Always set roleId to 1
    body.set('roleId', '1');

    const url = `${process.env.API_URL}/admin/users/${id}`;

    const response = await fetch(url, {
      method: 'POST', // POST مع _method=PUT
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    const text = await response.text();
    const contentType = response.headers.get('content-type') || '';

    let data: any = {};
    if (contentType.includes('application/json')) {
      data = JSON.parse(text);
    }

    if (!response.ok) {
      return {
        success: false,
        message: data.message || `Failed to update user (status ${response.status})`,
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
      message: error.message || 'Something went wrong while editing user',
      errors: null,
      status: 500,
    };
  }
}
