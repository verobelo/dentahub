'use client';

import { getCurrentUser } from '@/lib/actions/auth.actions';
import { account } from '@/lib/appwrite-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthChecker() {
  const router = useRouter();

  useEffect(() => {
    async function checkExistingSession() {
      try {
        const session = await account.getSession('current');
        if (session) {
          const user = await getCurrentUser();
          if (user) {
            router.push(`/patients/${user.$id}/dashboard`);
          }
        }
      } catch (error) {
        return null;
      }
    }
    checkExistingSession();
  }, [router]);
  return null;
}
