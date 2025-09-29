'use client';
import { DataTable } from '@/components/table/DataTable';
import { patientColumns } from '@/components/table/patientColumns';
import { getRecentAppointmentsList } from '@/lib/actions/appointment.actions';
import Image from 'next/image';
import Link from 'next/link';

import { useRouter } from 'next/navigation';

import { account } from '@/lib/appwrite-client';
import { Appointment } from '@/types/appwrite.types';
import { Models } from 'appwrite';
import { useEffect, useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import DentalChatBot from '@/components/DentalChatBot';
import PersonalInformation from '@/components/PersonalInformation';
import { Button } from '@/components/ui/button';
import LogoutButton from '@/components/LogoutButton';

export default function Dashboard() {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const currentUser = await account.get();
        setUser(currentUser);

        const appointmentData = await getRecentAppointmentsList();
        setAppointments(appointmentData.documents);
      } catch (error) {
        router.push('/');
      }
    }
    checkAuth();
  }, [router]);

  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
      <header className='sticky top-3 z-20 mx-3 flex flex-row items-center justify-between rounded-2xl bg-dark-200 px-[5%] py-3 shadow-lg xl:px-12'>
        <Link href='/' className='cursor-pointer'>
          <Image src='/logo-dark.png' alt='logo' width={200} height={200} />
        </Link>
        <LogoutButton />
      </header>
      <main className='flex flex-col items-center space-y-6 px-[5%] pb-12 xl:space-y-12 xl:px-12'>
        <section className='w-full space-y-4'>
          <h1 className='text-3xl leading-[36px] font-bold md:text-4xl md:leading-[40px]'>
            Welcome,{' '}
            <span className='text-green-primary'>
              {user?.name.trim().split(' ')[0]}
            </span>
          </h1>
          <p className='text-dark-700'>
            Manage your appointments and personal information
          </p>
        </section>

        <Accordion
          type='single'
          collapsible
          className='w-full'
          defaultValue='item-1'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>View Appointments</AccordionTrigger>
            <AccordionContent>
              <div className='my-10'>
                <DataTable
                  data={appointments.filter(
                    (appointment) => appointment.patient.userId === user?.$id
                  )}
                  columns={patientColumns}
                />
              </div>
              <Button
                asChild
                variant='link'
                className='bg-green-primary hover:brightness-110 self-start'>
                <Link href={`/patients/${user?.$id}/new-appointment`}>
                  Make a new appointment
                </Link>
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger>View Personal Information</AccordionTrigger>
            <AccordionContent>
              <div className='my-10 max-h-[50vh] overflow-y-scroll'>
                <PersonalInformation userId={user?.$id} />
              </div>
              <div className='flex items-center justify-center'>
                <Button
                  variant='link'
                  className='bg-green-primary text-white hover:brightness-115 px-3'
                  asChild>
                  <Link href={`/patients/${user?.$id}/dashboard/edit`}>
                    Edit Personal Information
                  </Link>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <div className='mt-12 text-center'>
            <h2 className='text-xl leading-[24px] font-bold md:text-2xl md:leading-[30px]'>
              Chat with our{' '}
              <span className='text-green-primary'>Dental Assistant</span>
            </h2>
            <div className='mt-12'>
              <DentalChatBot />
            </div>
          </div>
        </Accordion>
      </main>
    </div>
  );
}
