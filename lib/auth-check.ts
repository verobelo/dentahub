import { account } from './appwrite-client';

export async function checkAuth() {
  try {
    const session = await account.get();
    return session;
  } catch (error) {
    return null;
  }
}
