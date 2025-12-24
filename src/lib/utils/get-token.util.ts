import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
// أو المكان اللي فيه authOptions

export async function getToken() {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log('❌ No session found');
    return null;
  }

  // الـ accessToken موجود في الـ session
  return (session as any).accessToken;
}
