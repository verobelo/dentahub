import AppointmentForm from '@/components/forms/AppointmentForm';
import { getPatient } from '@/lib/actions/patient.actions';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function NewAppointment({ params }: SearchParamProps) {
  const { userId } = await params;
  const patient = await getPatient(userId);
  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar container my-auto'>
        <div className='sub-container max-w-3xl flex-1 justify-between'>
          <Link href='/' className='cursor-pointer'>
            <Image
              src='/logo-dark.png'
              alt='logo'
              width={300}
              height={100}
              className='mb-2 object-cover mx-auto'
            />
          </Link>

          <AppointmentForm
            type='create'
            userId={userId}
            patientId={patient.$id}
          />

          <div className='text-14-regular mt-20 flex justify-between'>
            <p className='text-center text-dark-600'>&copy; 2025 DentaHub</p>
            <Link
              href={`/patients/${patient?.$id}/dashboard`}
              className='text-green-500 hover:brightness-115 flex gap-4 items-center underline'>
              Go to the dashboard{' '}
              <span>
                <ArrowRight size={15} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Image
        width={1000}
        height={1000}
        src='/appointment.jpg'
        alt='decorative image'
        className='side-img max-w-[390px] bg-bottom'
      />
    </div>
  );
}
