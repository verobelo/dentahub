import { z } from 'zod';

export const UserFormValidation = z.object({
  username: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.email('Invalid email address'),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
    .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .regex(/(?=.*\d)/, 'Password must contain at least one number')
    .regex(
      /(?=.*[.,!@#$%^&*()_+\-=\[\]{};':"\\|<>?])/,
      'Password must contain at least one special character'
    ),
});

export const PatientFormValidation = z.object({
  username: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.email('Invalid email address'),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
  birthDate: z.coerce.date(),
  gender: z.enum(['Male', 'Female', 'N/A']),
  address: z.string().optional(),
  occupation: z.string().optional(),
  parentName: z.string().optional(),
  parentContactNumber: z.string().optional(),
  primaryDoctor: z.string().optional(),
  insuranceProvider: z.string().optional(),
  insurancePolicyNumber: z.string().optional(),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  recentSurgeries: z.string().optional(),
  importantIllnesses: z.string().optional(),
  identificationType: z.string().min(2, 'Select an identificaton document'),
  identificationNumber: z
    .string()
    .min(5, 'Please introduce your identification number'),
  identificationDocument: z.array(z.instanceof(File)).optional(),
  treatmentConsent: z.boolean().refine((value) => value === true, {
    message: 'You must consent to treatment in order to proceed',
  }),
  disclosureConsent: z.boolean().refine((value) => value === true, {
    message: 'You must consent to disclosure in order to proceed',
  }),
  privacyConsent: z.boolean().refine((value) => value === true, {
    message: 'You must consent to privacy in order to proceed',
  }),
});

export const CreateAppointmentSchema = z.object({
  primaryDoctor: z.string().min(2, 'Select at least one doctor'),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, 'Reason must be at least 2 characters')
    .max(500, 'Reason must be at most 500 characters'),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryDoctor: z.string().min(2, 'Select at least one doctor'),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryDoctor: z.string().min(2, 'Select at least one doctor'),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, 'Reason must be at least 2 characters')
    .max(500, 'Reason must be at most 500 characters'),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case 'create':
      return CreateAppointmentSchema;
    case 'cancel':
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}

export const LoginFormValidation = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});
