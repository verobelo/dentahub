'use server';

import { ID, Query } from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PATIENT_TABLE_ID,
  PROJECT_ID,
  storage,
  users,
} from '../appwrite.config';
import { parseStringify } from '../utils';
import { Patient } from '@/types/appwrite.types';

export const getUser = async (userId: string) => {
  const user = await users.get({ userId: userId });

  return {
    $id: user.$id,
    username: user.name,
    email: user.email,
    phone: user.phone,
  };
};

export async function registerPatient({
  identificationDocument,
  ...patient
}: RegisterUserParams) {
  let file;
  if (identificationDocument) {
    const inputFile =
      identificationDocument &&
      InputFile.fromBuffer(
        identificationDocument?.get('blobFile') as Blob,
        identificationDocument?.get('fileName') as string
      );

    file = await storage.createFile({
      bucketId: BUCKET_ID!,
      fileId: ID.unique(),
      file: inputFile,
    });
  }

  const newPatient = await databases.createDocument({
    databaseId: DATABASE_ID!,
    collectionId: PATIENT_TABLE_ID!,
    documentId: ID.unique(),
    data: {
      identificationDocumentId: file?.$id ? file.$id : null,
      identificationDocumentUrl: file?.$id
        ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
        : null,
      ...patient,
    },
  });

  return parseStringify(newPatient);
}

export async function getPatient(userId: string) {
  const patients = await databases.listDocuments({
    databaseId: DATABASE_ID!,
    collectionId: PATIENT_TABLE_ID!,
    queries: [Query.equal('userId', userId)],
  });
  return parseStringify(patients.documents[0]);
}

export async function updatePatient(
  patientId: string,
  updateData: Partial<Patient>
) {
  const updatedPatient = await databases.updateDocument({
    databaseId: DATABASE_ID!,
    collectionId: PATIENT_TABLE_ID!,
    documentId: patientId,
    data: updateData,
  });

  return parseStringify(updatedPatient);
}

export async function uploadIdentificationDocument(formData: FormData) {
  const inputFile = InputFile.fromBuffer(
    formData.get('blobFile') as Blob,
    formData.get('fileName') as string
  );

  const file = await storage.createFile({
    bucketId: BUCKET_ID!,
    fileId: ID.unique(),
    file: inputFile,
  });

  return file;
}

export async function addPhoneToUser(userId: string, number: string) {
  await users.updatePhone(userId, number);
}
