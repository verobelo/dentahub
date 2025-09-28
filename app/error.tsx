'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='text-center space-y-6 mt-96'>
      <h1 className='text-3xl font-semibold text-green-primary'>
        Something went wrong!
      </h1>
      <p className='text-lg'>{error.message}</p>
      <Button
        className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg'
        onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
