'use client';

import { getCurrentUser } from '@/lib/actions/auth.actions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthChecker() {
  const router = useRouter();

  useEffect(() => {
    async function checkExistingSession() {
      const user = await getCurrentUser();
      if (user) {
        router.push(`/patients/${user.$id}/dashboard`);
      }
    }
    checkExistingSession();
  }, [router]);
  return null;
}
