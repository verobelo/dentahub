'use client';

import { Form } from '@/components/ui/form';
import { UserFormValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CustomFormField from '../CustomFormField';
import SubmitButton from '../SubmitButton';

import { createUser, loginUser } from '@/lib/actions/auth.actions';
import Link from 'next/link';
import { Button } from '../ui/button';

export enum FormFieldType {
  INPUT = 'input',
  CHECKBOX = 'checkbox',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
}

export default function PatientForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      phone: '',
    },
  });

  async function onSubmit({
    username,
    email,
    password,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = { username, email, password, phone };

      const user = await createUser(userData);

      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDemo(e) {
    e.preventDefault();
    const demoUser = await loginUser('demo@example.com', '1234.Default');
    if (demoUser) {
      router.push(`/patients/demo/dashboard`);
    }
    return demoUser;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 flex-1'>
        <section className='mb-12 space-y-4'>
          <h1 className='text-32-bold md:text-36-bold'>Welcome! </h1>
          <p className='text-dark-700'>
            Create an account to schedule your first appointment
          </p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name='username'
          label='Full name *'
          placeholder='John Doe'
          iconSrc='/user.svg'
          iconAlt='user'
          required={true}
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name='email'
          label='Email *'
          placeholder='johndoe@yahoo.com'
          iconSrc='/email.svg'
          iconAlt='email icon'
          required={true}
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name='phone'
          label='Phone number *'
          placeholder='e.g. 555 555 555'
          required={true}
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name='password'
          label='Password *'
          type='password'
          placeholder='Min. 8 characters'
          required={true}
        />
        <SubmitButton isLoading={isLoading}>Create an account</SubmitButton>
        <div className='flex justify-between'>
          <Button
            type='button'
            className='bg-red-500 hover:brightness-110'
            onClick={handleDemo}>
            Demo Patient
          </Button>
          <div className='flex gap-3 items-center justify-center'>
            <p className='text-dark-700'>Already have an account?</p>
            <Link
              href='/?login=true'
              className='text-green-400 underline hover:brightness-115'>
              Log in
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
