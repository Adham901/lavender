'use server';

import { getToken } from '@/lib/utils/get-token.util';

export async function deleteCategory(id: number) {
  const token = await getToken();
  if (!token) throw new Error('No access token');

  const res = await fetch(`${process.env.API_URL}/admin/categories/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`Failed with status ${res.status}`);

  return await res.json();
}
