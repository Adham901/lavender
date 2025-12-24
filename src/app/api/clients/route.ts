import { NextResponse } from 'next/server';
import { getToken } from '@/lib/utils/get-token.util';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const search = searchParams.get('filter[search]') || '';

    const token = await getToken();

    const apiUrl = new URL(`${process.env.API_URL}/admin/clients`);
    apiUrl.searchParams.append('page', page);
    if (search) apiUrl.searchParams.append('filter[search]', search);

    const response = await fetch(apiUrl.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) throw new Error('Failed to fetch clients');

    const payload = await response.json();
    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load clients' }, { status: 500 });
  }
}
