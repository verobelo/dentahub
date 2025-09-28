'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

export default function AdminLogoutButton() {
  const router = useRouter();

  function handleAdminLogout() {
    localStorage.removeItem('accessKey');
    window.location.href = '/';
  }

  return (
    <Button
      variant='link'
      className='bg-green-primary hover:brightness-110'
      onClick={handleAdminLogout}>
      <span className='hidden md:flex'>Log out</span>
      <LogOut />
    </Button>
  );
}
