import clsx from 'clsx';
import Image from 'next/image';

interface StatCardProps {
  type: 'appointments' | 'pending' | 'cancelled';
  count: number;
  label: string;
  icon: string;
}

export default function StatCard({
  count = 0,
  label,
  icon,
  type,
}: StatCardProps) {
  return (
    <div
      className={clsx(
        'flex flex-1 flex-col gap-6 rounded-2xl bg-cover p-6 shadow-lg',
        {
          'bg-appointments': type === 'appointments',
          'bg-pending': type === 'pending',
          'bg.cancelled': type === 'cancelled',
        }
      )}>
      <div className='flex items-center gap-4'>
        <Image
          src={icon}
          alt={type}
          width={32}
          height={32}
          className='size-8 w-fit'
        />
        <h2 className='text-white text-3xl text-bold leading-[36px]'>
          {count}
        </h2>
      </div>
      <p className='text-sm xl:text-base leading-[18px] font-normal'>{label}</p>
    </div>
  );
}
