'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Appointment } from '@/types/appwrite.types';
import StatusBadge from '../StatusBadge';
import { formatDateTime } from '@/lib/utils';
import { Doctors } from '@/constants';
import Image from 'next/image';
import AppointmentModal from '../AppointmentModal';

export const adminColumns: ColumnDef<Appointment>[] = [
  {
    header: 'ID',
    cell: ({ row }) => (
      <p className='text-sm leading-[18px} font-medium'>{row.index + 1}</p>
    ),
  },
  {
    accessorKey: 'patient',
    header: 'Patient',
    cell: ({ row }) => (
      <p className='text-sm leading-[18px] font-medium'>
        {row.original.patient?.username || 'No patient'}
      </p>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className='min-w-[115px]'>
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: 'schedule',
    header: 'Appointment',
    cell: ({ row }) => (
      <p className='text-sm leading-[18px] font-normal min-w-[100px]'>
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: 'primaryDoctor',
    header: 'Doctor',
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doc) => doc.name === row.original.primaryDoctor
      );

      return (
        <div className='flex flex-col md:flex-row items-center gap-3'>
          <Image
            src={doctor?.image || '/user.svg'}
            alt='Primary Doctor'
            width={100}
            height={100}
            className='size-8'
          />
          <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    cell: ({ row }) => (
      <p className='text-sm leading-[18px] font-medium'>
        {row.original.reason || 'No reason'}
      </p>
    ),
  },

  {
    id: 'actions',
    header: () => <div className='pl-4'>Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className='flex flex-col gap-3 md:flex-row md:gap-1'>
          <AppointmentModal
            type='schedule'
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            sendSMS={true}
          />
          <AppointmentModal
            type='cancel'
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            sendSMS={true}
          />
        </div>
      );
    },
  },
];
