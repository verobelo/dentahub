import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='text-center space-y-6 mt-96'>
      <h1 className='text-3xl font-semibold text-green-primary'>
        This page could not be found :(
      </h1>
      <Link
        href='/'
        className='inline-block bg-accent-500 text-dark-600 px-6 py-3 text-lg underline'>
        Go back to homepage
      </Link>
    </div>
  );
}
