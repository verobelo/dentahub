'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Form, FormControl } from '@/components/ui/form';
import CustomFormField from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { PatientFormValidation } from '@/lib/validation';
import { FormFieldType } from './PatientForm';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from '@/constants';
import { Label } from '../ui/label';
import { SelectItem } from '../ui/select';
import FileUploader from '../FileUploader';
import { registerPatient } from '@/lib/actions/patient.actions';

export default function RegisterForm({ user }: { user: User }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      username: user?.username,
      email: user?.email,
      phone: user?.phone,
    },
  });

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const file = values.identificationDocument[0];

      if (!file) {
        throw new Error('No file selected');
      }

      if (!file.type || file.type === '') {
        throw new Error('File type not detected');
      }

      if (!file.size || file.size === 0) {
        throw new Error('File has no content');
      }
      const reader = new FileReader();
      const fileData = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      formData = new FormData();
      const blob = await fetch(fileData).then((r) => r.blob());
      formData.append('blobFile', blob, file.name);
      formData.append('fileName', file.name);
    }

    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };

      const patient = await registerPatient(patientData);
      if (patient) router.push(`/patients/${user.$id}/new-appointment`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-12 flex-1'>
        <section className='space-y-4'>
          <h1 className='text-3xl font-bold leading-[36px] md:text-4xl md:leading-[40px]'>
            Welcome, {user.username.trim().split(' ')[0]}
          </h1>
          <p className='text-dark-700'>Tell us more about yourself</p>
        </section>
        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='font-bold text-lg leading-[24px] md:text-2xl md:leading-[28px]'>
              Personal Information
            </h2>
          </div>
        </section>
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
                  defaultValue={field.value as string}>
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
            <FormControl>
              <FileUploader
                files={(field.value as File[] | undefined) || []}
                onChange={field.onChange}
              />
            </FormControl>
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

        <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
      </form>
    </Form>
  );
}
