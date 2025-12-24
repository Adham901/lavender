'use server';

import { getToken } from '@/lib/utils/get-token.util';

export interface BulkUpdateOrdersStatusPayload {
  action: number;
  ids: number[];
}

export async function bulkUpdateOrdersStatus(payload: BulkUpdateOrdersStatusPayload) {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    const res = await fetch(`${process.env.API_URL}/admin/orders/bulk-update-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || 'Failed to update orders',
        status: res.status,
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
      status: 500,
    };
  }
}
