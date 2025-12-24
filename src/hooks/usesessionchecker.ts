// hooks/useSessionChecker.ts
'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useSessionChecker() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;

    // Check if session exists but is expired
    if (session) {
      const checkExpiry = () => {
        const expires = new Date(session.expires).getTime();
        const now = Date.now();

        if (now >= expires) {
          console.log('🔴 Session expired on client, signing out...');
          signOut({
            callbackUrl: '/login?session=expired',
            redirect: true,
          });
        }
      };

      // Check immediately
      checkExpiry();

      // Check every minute
      const interval = setInterval(checkExpiry, 60000);

      return () => clearInterval(interval);
    }
  }, [session, status, router]);

  return { session, status };
}
