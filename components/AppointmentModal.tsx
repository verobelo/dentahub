'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from './ui/button';
import AppointmentForm from './forms/AppointmentForm';
import { Appointment } from '@/types/appwrite.types';

export default function AppointmentModal({
  type,
  patientId,
  userId,
  appointment,
  sendSMS,
}: {
  type: 'schedule' | 'cancel';
  patientId: string;
  userId: string;
  appointment?: Appointment;
  sendSMS: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={appointment?.status === 'cancelled'}
          variant='ghost'
          className={`capitalize ${type === 'schedule' ? 'text-green-500' : 'bg-red-700'}`}>
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-dark-400 border-dark-500 sm:max-w-md'>
        <DialogHeader className='mb-4 space-y-3'>
          <DialogTitle className='capitalize'>{type} Appointment</DialogTitle>
          <DialogDescription>
            Please fill in the following details to {type} an appointment
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment}
          setIsOpen={setIsOpen}
          sendSMS={sendSMS}
        />
      </DialogContent>
    </Dialog>
  );
}
