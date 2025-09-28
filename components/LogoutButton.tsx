'use client';

import { account } from '@/lib/appwrite-client';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  async function handleLogout() {
    await account.deleteSession('current');
    window.location.href = '/';
  }

  return (
    <Button
      onClick={handleLogout}
      variant='link'
      className='bg-green-primary hover:brightness-110 md:gap-3 md:items-center'>
      <span className='hidden md:flex'>Log out</span>
      <LogOut />
    </Button>
  );
}
