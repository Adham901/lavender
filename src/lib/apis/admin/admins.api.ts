import { AdminUsersResponse } from '@/lib/types/admin';

export const getAdminUsers = async (): Promise<AdminUsersResponse> => {
  const response = await fetch(`/api/admins`, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Failed to fetch admin users`);
  }

  return response.json();
};
