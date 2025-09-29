'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getPatient } from '@/lib/actions/patient.actions';
import { formatDateTime } from '@/lib/utils';
import { Patient } from '@/types/appwrite.types';
import { useEffect, useState } from 'react';
import { FadeLoader } from 'react-spinners';

export default function PersonalInformation({
  userId,
}: {
  userId: string | undefined;
}) {
  const [patient, setPatient] = useState<Partial<Patient> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPatient() {
      if (!userId) return null;
      try {
        setIsLoading(true);
        const patient = await getPatient(userId);
        setPatient(patient);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPatient();
  }, [userId]);

  if (isLoading)
    return (
      <div className='flex items-center justify-center mb-10'>
        <FadeLoader
          loading={isLoading}
          color='#24ae7c'
          aria-label='Loading Spinner'
        />
      </div>
    );

  return (
    <Table>
      <TableHeader className='text-green-primary'>
        <TableRow>
          <TableHead className='font-extrabold w-[250px]'>Item</TableHead>
          <TableHead className='font-extrabold'>Information</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className='bg-dark-500'>Full name</TableCell>
          <TableCell>{patient?.username}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className='bg-dark-500'>Email</TableCell>
          <TableCell>{patient?.email}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className='bg-dark-500'>Phone number</TableCell>
          <TableCell>{patient?.phone}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className='bg-dark-500'>Birth date</TableCell>
          <TableCell>
            {patient?.birthDate
              ? formatDateTime(patient.birthDate).dateOnly
              : 'N/A'}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className='bg-dark-500'>Gender</TableCell>
          <TableCell>{patient?.gender || 'none'}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className='bg-dark-500'>Address</TableCell>
          <TableCell>{patient?.address || 'none'}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className='bg-dark-500'>Occupation</TableCell>
          <TableCell>{patient?.occupation || 'none'}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className='bg-dark-500'>Parent&apos;s name</TableCell>
          <TableCell>{patient?.parentName || 'none'}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className='bg-dark-500'>
            Parent&apos;s contact number
          </TableCell>
          <TableCell>{patient?.parentContactNumber || 'none'}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className='bg-dark-500'>Primary doctor</TableCell>
          <TableCell>{patient?.primaryDoctor || 'none'}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className='bg-dark-500'>Insurance provider</TableCell>
          <TableCell>{patient?.insuranceProvider || 'none'}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className='bg-dark-500'>Insurance number</TableCell>
          <TableCell>{patient?.insurancePolicyNumber || 'none'}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className='bg-dark-500'>Allegries</TableCell>
          <TableCell>{patient?.allergies || 'none'}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className='bg-dark-500'>Current medication</TableCell>
          <TableCell>{patient?.currentMedication || 'none'}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className='bg-dark-500'>Recent surgeries</TableCell>
          <TableCell>{patient?.recentSurgeries || 'none'}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className='bg-dark-500'>Important illnesses</TableCell>
          <TableCell>{patient?.importantIllnesses || 'none'}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className='bg-dark-500'>Identification type</TableCell>
          <TableCell>{patient?.identificationType}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className='bg-dark-500'>Identification number</TableCell>
          <TableCell>{patient?.identificationNumber}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className='bg-dark-500'>Identification document</TableCell>
          <TableCell>
            {patient?.identificationDocumentId &&
            patient?.identificationDocumentUrl ? (
              <img
                src={patient.identificationDocumentUrl}
                alt='Identification Document'
                className='w-16 h-16 object-cover rounded'
              />
            ) : (
              <span className='text-gray-500'>No image</span>
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
