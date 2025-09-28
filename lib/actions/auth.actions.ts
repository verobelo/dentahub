import { account, ID } from '../appwrite-client';
import { addPhoneToUser } from './patient.actions';

export async function createUser(user: CreateUserParams) {
  const newUser = await account.create({
    userId: ID.unique(),
    email: user.email,
    password: user.password,
    name: user.username,
  });

  const session = await account.createEmailPasswordSession(
    user.email,
    user.password
  );

  await addPhoneToUser(newUser.$id, user.phone);

  return newUser;
}

export async function loginUser(email: string, password: string) {
  const session = await account.createEmailPasswordSession(email, password);
  return session;
}

export async function getCurrentUser() {
  const user = await account.get();
  return user;
}
