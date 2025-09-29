declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = 'Male' | 'Female' | 'N/A';
declare type Status = 'pending' | 'scheduled' | 'cancelled';

declare interface CreateUserParams {
  username: string;
  email: string;
  password: string;
  phone: string;
}
declare interface User {
  $id: string;
  username: string;
  email: string;
  phone: string;
}

declare interface RegisterUserParams {
  userId: string;
  username: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  identificationType: string;
  identificationNumber: string;
  treatmentConsent: boolean;
  disclosureConsent: boolean;
  privacyConsent: boolean;
  address?: string | undefined;
  occupation?: string | undefined;
  parentName?: string | undefined;
  parentContactNumber?: string | undefined;
  primaryDoctor?: string | undefined;
  insuranceProvider?: string | undefined;
  insurancePolicyNumber?: string | undefined;
  allergies?: string | undefined;
  currentMedication?: string | undefined;
  recentSurgeries?: string | undefined;
  importantIllnesses?: string | undefined;
  identificationDocument?: FormData | undefined;
}

declare type CreateAppointmentParams = {
  userId: string;
  patient: string;
  primaryDoctor: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: Appointment;
  type: string;
  sendSMS?: boolean;
};
