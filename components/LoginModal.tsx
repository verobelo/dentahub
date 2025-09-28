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
import { loginUser } from '@/lib/actions/auth.actions';
import { LoginFormValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import CustomFormField from './CustomFormField';
import { FormFieldType } from './forms/PatientForm';
import { Form } from './ui/form';
import SubmitButton from './SubmitButton';

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function closeModal() {
    setIsOpen(false);
    router.push('/');
  }

  async function onSubmit({
    email,
    password,
  }: z.infer<typeof LoginFormValidation>) {
    setIsLoading(true);
    try {
      const session = await loginUser(email, password);
      if (session) {
        router.push(`/patients/${session.userId}/dashboard`);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className='space-y-5 bg-dark-400 border-dark-500 outline-none'>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-start justify-between '>
            <p className='text-center'>Log In</p>
            <Image
              src='/close.svg'
              alt='close icon'
              width={20}
              height={20}
              onClick={() => closeModal()}
              className='cursor-pointer'
              aria-label='Close log in window'
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the dashboard, please enter your email and password.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
            id='login-form'>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name='email'
              label='Email'
              placeholder='johndoe@yahoo.com'
              iconSrc='/email.svg'
              iconAlt='email'
            />

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name='password'
              label='Password'
              placeholder='Enter your password'
              type='password'
            />
          </form>
        </Form>
        {error && (
          <p className='text-red-400 text-sm font-normal leading-[18px] flex justify-center'>
            {error}
          </p>
        )}
        <AlertDialogFooter>
          <SubmitButton isLoading={isLoading} form='login-form'>
            Log in
          </SubmitButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
