import RegisterForm from '@/components/forms/RegisterForm';
import { getUser } from '@/lib/actions/patient.actions';
import Image from 'next/image';
import Link from 'next/link';

export default async function Register({ params }: SearchParamProps) {
  const { userId } = await params;
  const user = await getUser(userId);

  return (
    <div className='flex h-screen max-h-screen'>
      <section className='container'>
        <div className='sub-container max-w-[860px] flex-1 flex-col py-10'>
          <Link href='/' className='cursor-pointer'>
            <Image
              src='/logo-dark.png'
              alt='logo'
              width={300}
              height={100}
              className='mb-2 object-cover mx-auto'
            />
          </Link>

          <RegisterForm user={user} />
          <p className='py-12 text-sm text-center text-dark-600'>
            &copy; 2025 DentaHub
          </p>
        </div>
      </section>

      <Image
        width={1000}
        height={1000}
        src='/register.jpg'
        alt='decorative image'
        className='side-img max-w-[390px] '
      />
    </div>
  );
}
