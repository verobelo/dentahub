'use client';
import CustomFormField from '@/components/CustomFormField';
import FileUploader from '@/components/FileUploader';
import { FormFieldType } from '@/components/forms/PatientForm';
import { Button } from '@/components/ui/button';
import { Form, FormControl } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SelectItem } from '@/components/ui/select';
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from '@/constants';
import { getCurrentUser } from '@/lib/actions/auth.actions';
import {
  getPatient,
  updatePatient,
  uploadIdentificationDocument,
} from '@/lib/actions/patient.actions';
import { PatientFormValidation } from '@/lib/validation';
import { Patient } from '@/types/appwrite.types';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FadeLoader } from 'react-spinners';
import { z } from 'zod';

export default function EditPatientForm() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const router = useRouter();

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
    },
  });

  useEffect(() => {
    async function loadPatient() {
      setIsLoading(true);
      const currentUser = await getCurrentUser();

      if (!currentUser) {
        router.push('/');
        return;
      }

      setUserId(currentUser.$id);
      const patientData = await getPatient(currentUser.$id);
      const patient = patientData as unknown as Patient;
      setPatient(patient);

      form.reset({
        username: patient?.username,
        email: patient?.email,
        phone: patient?.phone,
        birthDate: patient?.birthDate,
        gender: patient?.gender,
        address: patient?.address || '',
        occupation: patient?.occupation || '',
        parentName: patient?.parentName || '',
        parentContactNumber: patient?.parentContactNumber || '',
        primaryDoctor: patient?.primaryDoctor || '',
        insuranceProvider: patient?.insuranceProvider || '',
        insurancePolicyNumber: patient?.insurancePolicyNumber || '',
        allergies: patient?.allergies || '',
        currentMedication: patient?.currentMedication || '',
        recentSurgeries: patient?.recentSurgeries || '',
        importantIllnesses: patient?.importantIllnesses || '',
        identificationType: patient?.identificationType,
        identificationNumber: patient?.identificationNumber,
      });

      setIsLoading(false);
    }

    loadPatient();
  }, [form, router]);

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);
    try {
      const updateData = { ...values };
      delete updateData.identificationDocument;

      if (
        values.identificationDocument &&
        values.identificationDocument.length > 0
      ) {
        const formData = new FormData();
        const blobFile = new Blob([values.identificationDocument[0]], {
          type: values.identificationDocument[0].type,
        });
        formData.append('blobFile', blobFile);
        formData.append('fileName', values.identificationDocument[0].name);

        const newFile = await uploadIdentificationDocument(formData);

        updateData.identificationDocumentId = newFile.$id;
        updateData.identificationDocumentUrl = `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${newFile.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`;
      }
      await updatePatient(patient!.$id, updateData);
      router.back();
    } catch (error) {
      console.error('Error updating patient:', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading)
    return (
      <div className='absolute top-[50%] left-[50%]'>
        <FadeLoader
          loading={isLoading}
          color='#24ae7c'
          aria-label='Loading Spinner'
        />
      </div>
    );

  return (
    <div className='max-w-5xl mx-auto p-6 relative'>
      <h1 className='text-2xl font-bold mb-6'>Edit Personal Information</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name='username'
            label='Full name *'
            placeholder='e.g. John Doe'
            iconSrc='/user.svg'
            iconAlt='user'
            required={true}
          />

          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name='email'
              label='Email *'
              placeholder='e.g. johndoe@yahoo.com'
              iconSrc='/email.svg'
              iconAlt='email icon'
              required={true}
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.PHONE_INPUT}
              name='phone'
              label='Phone number *'
              placeholder='e.g. 555 555 555'
              required={true}
            />
          </div>

          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name='birthDate'
              label='Date of birth *'
              placeholder='DD/MM/YYYY'
              type='date'
              required={true}
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SKELETON}
              name='gender'
              label='Gender'
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className='flex h-11 gap-2 xl:justify-between'
                    onChange={field.onChange}
                    defaultValue={field.value}>
                    {GenderOptions.map((option) => (
                      <div key={option} className='radio-group'>
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name='address'
              label='Address'
              placeholder='e.g. Abbey Road, London'
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name='occupation'
              label='Occupation'
              placeholder='e.g. Chocolatier'
            />
          </div>
          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name='parentName'
              label="Parent's name (in case of minors)"
              placeholder="e.g. Guardian's name"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.PHONE_INPUT}
              name='parentContactNumber'
              label="Parent's Contact Number (in case of minors)"
              placeholder='e.g. 555 555 555'
            />
          </div>
          <section className='space-y-6'>
            <div className='mb-9 space-y-1'>
              <h2 className='font-bold text-lg leading-[24px] md:text-2xl md:leading-[28px]'>
                Medical Information
              </h2>
            </div>
          </section>
          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name='primaryDoctor'
              label="Primary Doctor (choose 'General', if you are not sure)"
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
          </div>
          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name='insuranceProvider'
              label='Insurance Provider'
              placeholder='Horizon Insurances'
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name='insurancePolicyNumber'
              label='Policy Number'
              placeholder='e.g. ABC12345'
            />
          </div>
          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              name='allergies'
              label='Allergies (if any)'
              placeholder='e.g. Penicillin, Ibuprofen etc'
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              name='currentMedication'
              label='Current Medication (if any)'
              placeholder='e.g. Paracetamol 500mg, Atenolol 50mg etc'
            />
          </div>
          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              name='recentSurgeries'
              label='Recent Surgeries (if any)'
              placeholder='e.g. heart surgery 05.2025'
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              name='importantIllnesses'
              label='Important illnesses or conditions (if any)'
              placeholder='e.g. diabetis, cardiovascular disease etc'
            />
          </div>
          <section className='space-y-6'>
            <div className='mb-9 space-y-1'>
              <h2 className='font-bold text-lg leading-[24px] md:text-2xl md:leading-[28px]'>
                Identification and Verification
              </h2>
            </div>
          </section>
          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name='identificationType'
              label='Identification type *'
              placeholder='Please select an identification type'
              required={true}>
              {IdentificationTypes.map((identification) => (
                <SelectItem key={identification} value={identification}>
                  <p>{identification}</p>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name='identificationNumber'
              label='Identification number *'
              placeholder='e.g. AB45678RT'
              required={true}
            />
          </div>

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            name='identificationDocument'
            label='Scanned copy of identification document'
            renderSkeleton={(field) => (
              <div className='space-y-4'>
                {patient?.identificationDocumentUrl && (
                  <div className='border rounded-lg p-4 flex gap-5 justify-center items-center'>
                    <p className='text-sm text-gray-600 mb-2'>
                      Current document:
                    </p>
                    <Image
                      width={100}
                      height={100}
                      src={patient.identificationDocumentUrl}
                      alt='Current ID Document'
                      className='w-32 h-32 object-cover'
                      unoptimized
                    />
                  </div>
                )}

                <div>
                  <p className='text-sm text-gray-600 mb-2'>
                    {patient?.identificationDocumentUrl
                      ? 'Upload new document:'
                      : 'Upload document:'}
                  </p>
                  <FormControl>
                    <FileUploader
                      files={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </div>
              </div>
            )}
          />

          <section className='space-y-6'>
            <div className='mb-9 space-y-1'>
              <h2 className='font-bold text-lg leading-[24px] md:text-2xl md:leading-[28px]'>
                Consent and Privacy
              </h2>
            </div>
          </section>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='treatmentConsent'
            label='I consent to treatment *'
            required={true}
          />
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='disclosureConsent'
            label='I consent to disclosure of information *'
            required={true}
          />
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='privacyConsent'
            label='I consent to privacy policy *'
            required={true}
          />

          <div className='flex gap-4 mt-12'>
            <Button
              type='submit'
              disabled={isLoading}
              className='flex-1 bg-green-primary text-white hover:brightness-110'>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              type='button'
              onClick={() => router.back()}
              className='flex-1 bg-red-700'>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
