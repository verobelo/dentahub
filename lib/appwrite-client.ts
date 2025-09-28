import { Client, Account, ID } from 'appwrite';

const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;

const client = new Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!);

export const account = new Account(client);

export { ID };
