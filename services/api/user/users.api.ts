import { doc, getDoc, setDoc } from 'firebase/firestore';

import { User } from '../../../types/types';
import { usersColRef } from '../../firebase/firebase';

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
