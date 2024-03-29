import Constant from 'expo-constants';
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from 'firebase/auth';

import { auth } from '../../firebase/firebase';
import { createUser } from '../user/users.api';

export type RegisterUserDto = {
  email: string;
  password: string;
  name: string;
};
export type LoginDto = Omit<RegisterUserDto, 'name'>;
export type ForgotPasswordDto = Pick<RegisterUserDto, 'email'>;

export async function register({
  email,
  password,
  name,
}: RegisterUserDto): Promise<UserCredential> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const { user } = userCredential;

  await sendEmailVerification(user);
  await updateProfile(user, {
    displayName: name,
  });

  // store user data to firestore
  await createUser({
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    uid: user.uid,
    likedStoryIds: [],
    likedReplyIds: [],
    savedStoryIds: [],
  });

  return userCredential;
}

export async function loginWithGoogle(idToken: string) {
  const credential = GoogleAuthProvider.credential(idToken);
  const userCredential = await signInWithCredential(auth, credential);

  const additionalInfo = getAdditionalUserInfo(userCredential);

  if (additionalInfo?.isNewUser) {
    const { user } = userCredential;
    await createUser({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      likedStoryIds: [],
      likedReplyIds: [],
      savedStoryIds: [],
    });
  }
}

export async function login({ email, password }: LoginDto): Promise<UserCredential> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  return userCredential;
}

export async function forgotPassword({ email }: ForgotPasswordDto) {
  const redirectUri = Constant.manifest?.extra?.redirectUri;

  await sendPasswordResetEmail(auth, email, {
    url: redirectUri,
    handleCodeInApp: false,
  });
  return email;
}
