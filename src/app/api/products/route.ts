import { NextResponse } from 'next/server';
import { getToken } from '@/lib/utils/get-token.util';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || '1';
  const search = searchParams.get('filter[search]') || ''; // ✅ دعم البحث

  try {
    const token = await getToken();

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized: no token found' },
        { status: 401 }
      );
    }

    // بناء الـ URL مع البحث
    const apiUrl = new URL(`${process.env.API_URL}/admin/products`);
    apiUrl.searchParams.append('page', page);
    if (search) apiUrl.searchParams.append('filter[search]', search); // ✅ البحث

    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Products API Error:', errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
