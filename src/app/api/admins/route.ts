import { AdminUsersResponse } from '@/lib/types/admin';
import { getToken } from '@/lib/utils/get-token.util';
import { NextResponse } from 'next/server';

// Handle GET requests for fetching addresses
export async function GET() {
  try {
    // Get the user's token
    const token = await getToken();

    // Call the backend with the token
    const response = await fetch(`${process.env.API_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    // Throw an error if the request failed
    if (!response.ok) throw new Error('Failed to fetch user admin');

    // Return fetched data as JSON
    const payload: AdminUsersResponse = await response.json();

    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to load admin',
      },
      { status: 500 }
    );
  }
}
