import AdminLogoutButton from '@/components/AdminLogoutButton';
import StatCard from '@/components/StatCard';
import { adminColumns } from '@/components/table/adminColumns';
import { DataTable } from '@/components/table/DataTable';
import { getRecentAppointmentsList } from '@/lib/actions/appointment.actions';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 0;

export default async function Admin() {
  const appointments = await getRecentAppointmentsList();

  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
      <header className='sticky top-3 z-20 mx-3 flex items-center justify-between rounded-2xl bg-dark-200 px-[5%] py-3 shadow-lg xl:px-12'>
        <Link href='/' className='cursor-pointer'>
          <Image src='/logo-dark.png' alt='logo' width={200} height={200} />
        </Link>
        <AdminLogoutButton />
      </header>
      <main className='flex flex-col items-center space-y-6 px-[5%] pb-12 xl:space-y-12 xl:px-12'>
        <section className='w-full space-y-4'>
          <h1 className='text-3xl leading-[36px] font-bold md:text-4xl md:leading-[40px]'>
            Welcome, Admin
          </h1>
          <p className='text-dark-700'>Manage your appointments</p>
        </section>

        <section className='flex w-full flex-col justify-between gap-5 sm:flex-row xl:gap-10'>
          <StatCard
            type='appointments'
            count={appointments.scheduledCount}
            label='Scheduled Appointments'
            icon='/appointments.svg'
          />
          <StatCard
            type='pending'
            count={appointments.pendingCount}
            label='Pending Appointments'
            icon='/pending.svg'
          />
          <StatCard
            type='cancelled'
            count={appointments.cancelledCount}
            label='Cancelled Appointments'
            icon='/cancelled.svg'
          />
        </section>
        <DataTable data={appointments.documents} columns={adminColumns} />
      </main>
    </div>
  );
}
