import AuthChecker from '@/components/AuthChecker';
import PatientForm from '@/components/forms/PatientForm';
import LoginModal from '@/components/LoginModal';
import PasskeyModal from '@/components/PasskeyModal';
import { checkAuth } from '@/lib/auth-check';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home({ searchParams }: SearchParamProps) {
  const awaitedSearchParams = await searchParams;
  const isAdmin = awaitedSearchParams.admin === 'true';
  const isLogIn = awaitedSearchParams.login === 'true';

  const session = await checkAuth();

  if (session && isLogIn) {
    redirect(`/patients/${session?.$id}/dashboard`);
  }
  return (
    <div className='flex h-screen max-h-screen'>
      <AuthChecker />
      {isAdmin && <PasskeyModal />}
      {isLogIn && !session && <LoginModal />}
      <section className='remove-scrollbar container my-auto'>
        <div className='sub-container max-w-[760px] flex-1 flex-col py-10'>
          <Image
            src='/logo-dark.png'
            alt='logo'
            width={300}
            height={100}
            className='mb-10 object-cover mx-auto'
          />

          <PatientForm />
          <div className='text-14-regular mt-12 flex justify-between'>
            <p className='text-center text-dark-600'>&copy; 2025 DentaHub</p>
            <Link
              href='/?admin=true'
              className='text-green-500 hover:brightness-115'>
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        width={1000}
        height={1000}
        src='/onboard-img.png'
        alt='hero image'
        className='side-img max-w-[35%]'
      />
    </div>
  );
}
