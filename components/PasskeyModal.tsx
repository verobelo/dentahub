'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { decryptKey, encryptKey } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PasskeyModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [passKey, setPassKey] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const path = usePathname();

  const encryptedKey =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('accessKey')
      : null;

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);
    if (path) {
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setIsOpen(false);
        router.push('/admin');
      } else {
        setIsOpen(true);
      }
    }
  }, [encryptedKey]);

  function closeModal() {
    setIsOpen(false);
    router.push('/');
  }
  function validatePassKey(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passKey);
      localStorage.setItem('accessKey', encryptedKey);
      setIsOpen(false);
    } else {
      setError('Invalid passkey. Please try again.');
    }
  }
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className='space-y-5 bg-dark-400 border-dark-500 outline-none'>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-start justify-between '>
            Admin Access Verification
            <Image
              src='/close.svg'
              alt='close icon'
              width={20}
              height={20}
              onClick={() => closeModal()}
              className='cursor-pointer'
              aria-label='Close admin verification window'
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passKey}
            onChange={(value) => setPassKey(value)}>
            <InputOTPGroup className='w-full flex justify-between'>
              <InputOTPSlot
                className='text-4xl font-bold leading-[40px] justify-center flex border border-dark-500 rounded-lg size-16 gap-4'
                index={0}
              />
              <InputOTPSlot
                className='text-4xl font-bold leading-[40px] justify-center flex border border-dark-500 rounded-lg size-16 gap-4'
                index={1}
              />
              <InputOTPSlot
                className='text-4xl font-bold leading-[40px] justify-center flex border border-dark-500 rounded-lg size-16 gap-4'
                index={2}
              />
              <InputOTPSlot
                className='text-4xl font-bold leading-[40px] justify-center flex border border-dark-500 rounded-lg size-16 gap-4'
                index={3}
              />
              <InputOTPSlot
                className='text-4xl font-bold leading-[40px] justify-center flex border border-dark-500 rounded-lg size-16 gap-4'
                index={4}
              />
              <InputOTPSlot
                className='text-4xl font-bold leading-[40px] justify-center flex border border-dark-500 rounded-lg size-16 gap-4'
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className='text-red-400 text-sm font-normal leading-[18px] mt-4 flex justify-center'>
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => validatePassKey(e)}
            className='bg-green-primary text-white w-full'>
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
