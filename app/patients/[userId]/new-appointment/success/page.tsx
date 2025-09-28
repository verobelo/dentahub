import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { getAppointment } from '@/lib/actions/appointment.actions';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default async function Success({
  params,
  searchParams,
}: SearchParamProps) {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;

  const { userId } = awaitedParams;
  const appointmentId = (awaitedSearchParams?.appointmentId as string) || '';

  const appointment = await getAppointment(appointmentId);
  const doctor = Doctors.find(
    (doctor) => doctor.name === appointment.primaryDoctor
  );

  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
      <div className=' m-auto flex flex-1 flex-col items-center justify-between gap-10 pb-10'>
        <Link href='/'>
          <Image
            src='/logo-dark.png'
            height={1000}
            width={1000}
            alt='logo'
            className='w-fit'
          />
        </Link>
        <section className='flex flex-col items-center'>
          <Image src='/success.gif' height={300} width={280} alt='success' />
          <h2 className='mb-6 text-3xl leading-[36px] font-bold md:text-4xl md:leading-[40px] max-w-[600px] text-center'>
            Your <span className='text-green-500'>appointment request</span> has
            been successfully submitted
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className='flex w-full flex-col items-center gap-8 border-y-2 border-dark-400 py-8 md:w-fit md:flex-row'>
          <p>Requested appointment details</p>
          <div className='flex items-center gap-3'>
            <Image
              src={doctor?.image || '/user.svg'}
              alt='doctor'
              width={100}
              height={100}
              className='rounded-full size-6'
            />
            <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
          </div>
          <div className='flex gap-2'>
            <Image src='/calendar.svg' width={24} height={24} alt='calendar' />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
        <Button
          variant='link'
          className='bg-green-primary text-white hover:brightness-115'
          asChild>
          <Link href={`/patients/${userId}/dashboard`}>Go to Dashboard</Link>
        </Button>
        <p className='text-center text-dark-600 text-sm leading-[16px] font-normal'>
          &copy; 2025 DentaHub
        </p>
      </div>
    </div>
  );
}
