'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Eye, EyeClosed } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormFieldType } from './forms/PatientForm';
import { Appointment } from '@/types/appwrite.types';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface CustomProps<T extends FieldValues = FieldValues> {
  control: Control<T>;
  fieldType: FormFieldType;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (
    field: ControllerRenderProps<T, Path<T>>
  ) => React.ReactNode;
  required?: boolean;
  type?: 'text' | 'password' | 'email' | 'date';
  allAppointments?: Appointment[];
  selectedDoctor?: string;
}

function RenderField<T extends FieldValues>({
  field,
  props,
}: {
  field: ControllerRenderProps<T>;
  props: CustomProps<T>;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    fieldType,
    iconAlt,
    iconSrc,
    placeholder,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
    type,
  } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || 'icon'}
              height={24}
              width={24}
              className='ml-2 w-auto h-auto'
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className='shad-input border-0'
              aria-required={props.required}
              type={
                type === 'password'
                  ? showPassword
                    ? 'text'
                    : 'password'
                  : type
              }
            />
          </FormControl>
          {type === 'password' && (
            <Button
              type='button'
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className='mt-1'
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeClosed /> : <Eye />}
            </Button>
          )}
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          <FormControl>
            <PhoneInput
              defaultCountry='US'
              placeholder={placeholder}
              international
              withCountryCallingCode
              value={(field.value as string) || undefined}
              onChange={field.onChange}
              className='shad-input'
              aria-required={props.required}
            />
          </FormControl>
        </div>
      );

    case FormFieldType.DATE_PICKER:
      const isTimeSlotTaken = (time: Date): boolean => {
        if (!props.selectedDoctor || !props.allAppointments) return false;

        return props.allAppointments.some((appointment) => {
          const appointmentTime = new Date(appointment.schedule);
          const isSameDoctor =
            appointment.primaryDoctor === props.selectedDoctor;
          const isSameTime = appointmentTime.getTime() === time.getTime();
          const isNotCancelled = appointment.status !== 'cancelled';

          return isSameDoctor && isSameTime && isNotCancelled;
        });
      };
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400 py-2'>
          <Image
            src='/calendar.svg'
            height={24}
            width={24}
            alt='Calendar'
            className='mx-2'
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? 'dd/MM/yyyy'}
              timeFormat='HH:mm'
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel='Time:'
              ariaRequired={props.required ? 'true' : undefined}
              minDate={new Date()}
              filterTime={(time) => {
                const hours = time.getHours();
                if (hours < 9 || hours >= 21) return false;

                return !isTimeSlotTaken(time);
              }}
            />
          </FormControl>
        </div>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            aria-required={props.required}>
            <FormControl>
              <SelectTrigger>
                {' '}
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent> {props.children}</SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className='flex items-center gap-4'>
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-required={props.required}
            />
            <label
              htmlFor={props.name}
              className='cursor-pointer text-sm font-medium text-dark-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:leading-none'>
              {props.label}
            </label>
          </div>
        </FormControl>
      );

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;

    default:
      break;
  }
}

export default function CustomFormField<T extends FieldValues = FieldValues>(
  props: CustomProps<T>
) {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex-1'>
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />
          <FormMessage className='text-red-400' />
        </FormItem>
      )}
    />
  );
}
