import Constant from 'expo-constants';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential,
} from 'firebase/auth';

import { User } from '../../../types/types';
import app from '../../firebase/firebase';

const auth = getAuth(app);

type CreateUserDto = Omit<User, 'id'>;

export async function register({
  email,
  password,
  name,
}: CreateUserDto): Promise<UserCredential> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(userCredential.user);
  await updateProfile(userCredential.user, {
    displayName: name,
  });

  return userCredential;
}

export async function login({
  email,
  password,
}: Omit<CreateUserDto, 'name'>): Promise<UserCredential> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  return userCredential;
}

export async function logout() {
  await signOut(auth);
}

export async function forgotPassword({ email }: Pick<CreateUserDto, 'email'>) {
  const redirectUri = Constant.manifest?.extra?.redirectUri;

  await sendPasswordResetEmail(auth, email, {
    url: redirectUri,
    handleCodeInApp: false,
  });
  return email;
}
