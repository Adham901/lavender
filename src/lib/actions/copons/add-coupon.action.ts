'use server';

import { getToken } from '@/lib/utils/get-token.util';

type Payload =
  | {
      code: string;
      type: 'percentage' | 'fixed';
      value: number | string;
      min_order_amount: number | string;
      max_discount: number | string;
      usage_limit: number;
      per_user_limit: number;
      starts_at: string;
      expires_at: string;
      is_active: 0 | 1 | boolean;
    }
  | FormData;

export const addCoupon = async (payload: Payload) => {
  try {
    const token = await getToken();
    if (!token) throw new Error('No access token found');

    const body: FormData = payload instanceof FormData ? payload : new FormData();

    if (!(payload instanceof FormData)) {
      body.append('code', payload.code);
      body.append('type', payload.type);
      body.append('value', String(payload.value));
      body.append('min_order_amount', String(payload.min_order_amount));
      if (payload.type === 'fixed') {
        body.append('max_discount', payload.max_discount ? String(payload.max_discount) : '');
      } else {
        body.append('max_discount', String(payload.max_discount));
      }
      body.append('usage_limit', String(payload.usage_limit));
      body.append('per_user_limit', String(payload.per_user_limit));
      body.append('starts_at', payload.starts_at);
      body.append('expires_at', payload.expires_at);
      body.append('is_active', String(payload.is_active));
    }

    const url = `${process.env.API_URL}/admin/coupons`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body,
    });

    const raw = await response.text();
    const contentType = response.headers.get('content-type') ?? '';

    if (contentType.includes('application/json')) {
      const data = JSON.parse(raw);
      if (!response.ok) throw new Error(data?.message || `Add failed (${response.status})`);
      return data;
    }

    // fallback non-JSON
    try {
      const data = JSON.parse(raw);
      if (!response.ok) throw new Error(data?.message || `Add failed (${response.status})`);
      return data;
    } catch (err) {
      console.error('ADD COUPON NON-JSON RESPONSE:', {
        status: response.status,
        contentType,
        bodyPreview: raw.slice(0, 2000),
      });
      throw new Error(`Server returned non-JSON response (${response.status})`);
    }
  } catch (error: any) {
    throw new Error(error.message || 'Something went wrong');
  }
};
