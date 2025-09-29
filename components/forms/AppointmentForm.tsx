'use client';

import { Form } from '@/components/ui/form';
import { Doctors } from '@/constants';
import {
  createAppointment,
  getRecentAppointmentsList,
  updateAppointment,
} from '@/lib/actions/appointment.actions';
import { getAppointmentSchema } from '@/lib/validation';
import { Appointment } from '@/types/appwrite.types';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CustomFormField from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { SelectItem } from '../ui/select';
import { FormFieldType } from './PatientForm';

export default function AppointmentForm({
  userId,
  patientId,
  type,
  appointment,
  setIsOpen,
  sendSMS,
}: {
  userId: string;
  patientId: string;
  type: 'create' | 'cancel' | 'schedule';
  appointment?: Appointment;
  setIsOpen?: (open: boolean) => void;
  sendSMS?: boolean;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const AppointmentFormValidation = getAppointmentSchema(type);
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    async function loadAppointments() {
      try {
        const appointements = await getRecentAppointmentsList();
        setAllAppointments(appointements?.documents);
      } catch (error) {
        console.log(error);
      }
    }
    loadAppointments();
  }, []);

  const form = useForm({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryDoctor: appointment ? appointment.primaryDoctor : '',
      schedule: appointment
        ? new Date(appointment.schedule)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : '',
      note: appointment ? appointment.note : '',
      cancellationReason: '',
    },
  });

  const selectedDoctor = form.watch('primaryDoctor');
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);

    let status;
    switch (type) {
      case 'schedule':
        status = 'scheduled';
        break;
      case 'cancel':
        status = 'cancelled';
        break;
      default:
        status = 'pending';
    }

    try {
      if (type === 'create' && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryDoctor: values.primaryDoctor,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        };
        const appointment = await createAppointment(appointmentData);
        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment!.$id!,
          appointment: {
            primaryDoctor: values?.primaryDoctor,
            schedule: values?.schedule,
            status: status as Status,
            cancellationReason: values?.cancellationReason,
            note: values?.note,
          },
          type,
          sendSMS,
        };
        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment) {
          form.reset();
          setIsOpen?.(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 flex-1'>
        {type === 'create' && (
          <section className='mb-12 space-y-4'>
            <h1 className='text-32-bold md:text-36-bold'>New Appointment</h1>
            <p className='text-dark-700'>
              Request a new appointment in 10 seconds
            </p>
          </section>
        )}
        {type !== 'cancel' && (
          <>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name='primaryDoctor'
              label='Doctor'
              placeholder='Select a doctor'>
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className='flex items-center gap-2 cursor-pointer'>
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt={doctor.name}
                      className='rounded-full'
                    />
                    <p>
                      {doctor.name} - {doctor.specialty}
                    </p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name='schedule'
              label='Expected appointment date (please note, that today is excluded)'
              showTimeSelect
              dateFormat='dd/MM/yyyy -HH:mm'
              allAppointments={allAppointments}
              selectedDoctor={selectedDoctor}
            />
            <div className='flex flex-col gap-6 xl:flex-row'>
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name='reason'
                label='Reason for appointment'
                placeholder='Enter reason for appointment'
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name='note'
                label='Notes'
                placeholder='Enter notes'
              />
            </div>
          </>
        )}

        {type === 'cancel' && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name='cancellationReason'
            label='Reason for cancellation'
            placeholder='Enter reason for cancellation'
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${type === 'cancel' ? ' bg-red-700 text-white' : ' bg-green-primary text-white hover:brightness-110'} w-full`}>
          {type === 'cancel' && 'Cancel appointment'}
          {type === 'create' && 'Create appointment'}
          {type === 'schedule' && 'Schedule appointment'}
        </SubmitButton>
      </form>
    </Form>
  );
}
