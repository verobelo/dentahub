'use server';

import { ID, Query } from 'node-appwrite';
import {
  APPOINTMENT_TABLE_ID,
  DATABASE_ID,
  databases,
  messaging,
} from '../appwrite.config';
import { formatDateTime, parseStringify } from '../utils';
import { Appointment } from '@/types/appwrite.types';
import { revalidatePath } from 'next/cache';

export async function createAppointment(appointment: CreateAppointmentParams) {
  try {
    const newAppointment = await databases.createDocument({
      databaseId: DATABASE_ID!,
      collectionId: APPOINTMENT_TABLE_ID!,
      documentId: ID.unique(),
      data: appointment,
    });

    return parseStringify(newAppointment);
  } catch (error) {
    console.error('An error occurred while creating a new appointment:', error);
  }
}

export async function getAppointment(appointmentId: string) {
  try {
    const appointment = await databases.getDocument({
      databaseId: DATABASE_ID!,
      collectionId: APPOINTMENT_TABLE_ID!,
      documentId: appointmentId,
    });
    return parseStringify(appointment);
  } catch (error) {
    console.error('An error occurred while retrieving the appointment:', error);
  }
}

export async function getRecentAppointmentsList() {
  const appointments = await databases.listDocuments<Appointment>({
    databaseId: DATABASE_ID!,
    collectionId: APPOINTMENT_TABLE_ID!,
    queries: [
      Query.orderAsc('$createdAt'),
      Query.select([
        '$id',
        '$createdAt',
        'primaryDoctor',
        'status',
        'schedule',
        'reason',
        'note',
        'cancellationReason',
        'userId',
        'patient.*',
      ]),
    ],
  });
  const initialCounts = {
    scheduledCount: 0,
    pendingCount: 0,
    cancelledCount: 0,
  };

  const counts = (appointments.documents as Appointment[]).reduce(
    (acc, appointment) => {
      if (appointment.status === 'scheduled') {
        acc.scheduledCount += 1;
      } else if (appointment.status === 'pending') {
        acc.pendingCount += 1;
      } else if (appointment.status === 'cancelled') {
        acc.cancelledCount += 1;
      }
      return acc;
    },
    initialCounts
  );
  const data = {
    totalCount: appointments.total,
    ...counts,
    documents: appointments.documents,
  };
  return parseStringify(data);
}

export async function updateAppointment({
  appointmentId,
  userId,
  appointment,
  type,
  sendSMS = true,
}: UpdateAppointmentParams) {
  const updatedAppointment = await databases.updateDocument({
    databaseId: DATABASE_ID!,
    collectionId: APPOINTMENT_TABLE_ID!,
    documentId: appointmentId,
    data: appointment,
  });
  if (!updatedAppointment) {
    throw new Error('Appointment not found');
  }

  if (sendSMS) {
    const smsMessage = `Hi, it's DentaHub. ${type === 'schedule' ? `Your appointment has been scheduled for ${formatDateTime(appointment.schedule).dateTime} with Dr. ${appointment.primaryDoctor}. Notes: ${appointment.note}` : `We regret to inform you that your appointment has been cancelled. Reason: ${appointment.cancellationReason}`}`;

    await sendSMSNotification(userId, smsMessage);
  }

  revalidatePath('/admin');
  return parseStringify(appointment);
}

export async function sendSMSNotification(userId: string, content: string) {
  const message = await messaging.createSMS({
    messageId: ID.unique(),
    content: content,
    users: [userId],
  });
  return parseStringify(message);
}
