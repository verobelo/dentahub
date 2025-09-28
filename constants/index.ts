export const GenderOptions = ['Male', 'Female', 'N/A'];

export const PatientFormDefaultValues = {
  username: '',
  email: '',
  phone: '',
  birthDate: new Date(Date.now()),
  gender: 'Male' as Gender,
  address: '',
  occupation: '',
  parentName: '',
  parentContactNumber: '',
  primaryDoctor: '',
  insuranceProvider: '',
  insurancePolicyNumber: '',
  allergies: '',
  currentMedication: '',
  recentSurgeries: '',
  importantIllnesses: '',
  identificationType: 'Birth Certificate',
  identificationNumber: '',
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  'Birth Certificate',
  "Driver's License",
  'Medical Insurance Card/Policy',
  'National Identity Card',
  'Passport',
  'Resident Card',
  'Student ID Card',
];

export const Doctors = [
  {
    image: '/drThompson.png',
    name: 'Michael Thompson',
    specialty: 'General Dentist',
  },
  {
    image: '/drGarcia.jpg',
    name: 'Laura Garcia',
    specialty: 'Endodontist',
  },
  {
    image: '/drBrooks.jpg',
    name: 'Anthony Brooks',
    specialty: 'Orthodontist',
  },
  {
    image: '/drAlvarez.jpg',
    name: 'Diego Alvarez',
    specialty: 'General Dentist',
  },
  {
    image: '/drBennet.jpg',
    name: 'Joshua Bennet',
    specialty: 'Oral Surgeon',
  },
  {
    image: '/drRamirez.jpg',
    name: 'Alex Ramirez',
    specialty: 'General Dentist',
  },
  {
    image: '/drMorales.jpg',
    name: 'Elena Morales',
    specialty: 'Pediatric Dentist',
  },
  {
    image: '/drNair.jpg',
    name: 'Priya Nair',
    specialty: 'Orthodontist',
  },
  {
    image: '/drCarter.png',
    name: 'Emma Carter',
    specialty: 'Periodontist & Hygiene',
  },
];

export const StatusIcon = {
  scheduled: '/check.svg',
  pending: '/pending.svg',
  cancelled: '/cancelled.svg',
};
