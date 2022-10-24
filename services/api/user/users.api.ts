import { updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import { User } from '../../../types/types';
import {
  auth,
  currentUserDocRef,
  profileRef,
  uploadImageAsync,
  usersColRef,
} from '../../firebase/firebase';

type CreateUserDto = User;

export async function createUser(createUserDto: CreateUserDto) {
  const userDocRef = doc(usersColRef, createUserDto.uid);
  await setDoc(userDocRef, createUserDto);
}

export async function findUser(uid: User['uid'] | undefined): Promise<User | undefined> {
  if (!uid) return undefined;

  const userDocRef = doc(usersColRef, uid);
  const snapshot = await getDoc(userDocRef);
  return snapshot.data();
}

export async function changeProfile(uri: string) {
  const imageUrl = await uploadImageAsync(profileRef, uri);

  await updateDoc(currentUserDocRef(), {
    photoURL: imageUrl,
  });

  const { currentUser } = auth;
  if (!currentUser) throw new Error('unauthorized');

  updateProfile(currentUser, {
    photoURL: imageUrl,
  });

  return currentUser.uid;
}

export async function removeProfile() {
  await updateDoc(currentUserDocRef(), {
    photoURL: null,
  });

  const { currentUser } = auth;
  if (!currentUser) throw new Error('unauthorized');

  updateProfile(currentUser, {
    photoURL: null,
  });

  return currentUser.uid;
}
