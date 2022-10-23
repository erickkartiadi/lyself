import 'react-native-get-random-values';

import { updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../../../types/types';
import {
  auth,
  currentUserDocRef,
  profileRef,
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

const uploadImageAsync = async (uri: string) => {
  const blob = (await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = () => {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  })) as any;

  const currProfileRef = ref(profileRef, uuidv4());
  await uploadBytes(currProfileRef, blob);
  blob.close();

  return getDownloadURL(currProfileRef);
};

export async function changeProfile(uri: string) {
  const imageUrl = await uploadImageAsync(uri);

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
