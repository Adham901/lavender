'use server';

import { getToken } from '@/lib/utils/get-token.util';

type Payload = { title?: string; tittle?: string; message: string } | FormData;

export const sendNotification = async (form: Payload) => {
  try {
    const token = await getToken();
    if (!token) throw new Error('No access token found');

    // Build FormData whether caller passed FormData or plain object
    const body = form instanceof FormData ? form : new FormData();
    if (!(form instanceof FormData)) {
      // server expects the wrong key "tittle" in your comment — adjust if needed
      body.append('tittle', (form as any).title ?? (form as any).tittle ?? '');
      body.append('message', (form as any).message ?? '');
    }

    const url = `${process.env.API_URL}/admin/send-notification`;
    console.log('REQUEST URL ===>', url);
    console.log('Using token present?', Boolean(token));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        // don't set Content-Type when sending FormData
      },
      body,
    });

    const text = await response.text();

    // If server returned HTML (likely redirect to login or error page) show full debug
    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      throw new Error(
        `API returned non-JSON response (status ${response.status}). Check URL/Token.`
      );
    }

    const payload = JSON.parse(text);

    if (!response.ok) {
      throw new Error(payload.message || `Failed to send notification (${response.status})`);
    }

    return payload;
  } catch (error: any) {
    throw new Error(error.message || 'Something went wrong');
  }
};
