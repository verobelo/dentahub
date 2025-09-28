import Image from 'next/image';
import { Button } from './ui/button';

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
  form?: string;
}

export default function SubmitButton({
  isLoading,
  className,
  children,
  form,
}: ButtonProps) {
  return (
    <Button
      form={form}
      type='submit'
      disabled={isLoading}
      className={
        className ?? 'bg-green-primary text-white w-full hover:brightness-110'
      }>
      {isLoading ? (
        <div className='flex items-center gap-4'>
          <Image
            src='/loader.svg'
            alt='loader icon'
            width={24}
            height={24}
            className='animate-spin'
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
