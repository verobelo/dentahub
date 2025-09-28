import { Models } from 'node-appwrite';

export interface Patient extends Models.Document {
  userId: string;
  username: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  parentName: string;
  parentContactNumber: string;
  primaryDoctor: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  recentSurgeries: string | undefined;
  importantIllnesses: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  identificationDocumentId: string | null;
  identificationDocumentUrl: string | null;
  privacyConsent: boolean;
  disclosureConsent: boolean;
  treatmentConsent: boolean;
}

export interface Appointment extends Models.Document {
  patient: Patient;
  schedule: Date;
  status: Status;
  primaryDoctor: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}
