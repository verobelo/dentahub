'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Appointment } from '@/types/appwrite.types';
import StatusBadge from '../StatusBadge';
import { formatDateTime } from '@/lib/utils';
import { Doctors } from '@/constants';
import Image from 'next/image';
import AppointmentModal from '../AppointmentModal';

export const patientColumns: ColumnDef<Appointment>[] = [
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
    accessorKey: 'cancellationReason',
    header: 'Cancellation reason',
    cell: ({ row }) => (
      <p className='text-sm leading-[18px] font-normal min-w-[100px]'>
        {row.original.cancellationReason}
      </p>
    ),
  },
  {
    accessorKey: 'note',
    header: 'Note',
    cell: ({ row }) => (
      <p className='text-sm leading-[18px] font-normal min-w-[100px]'>
        {row.original.note}
      </p>
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
            src={doctor?.image}
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
    id: 'actions',
    header: () => <div className='pl-4'>Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className='flex gap-1'>
          <AppointmentModal
            type='cancel'
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            sendSMS={false}
          />
        </div>
      );
    },
  },
];
