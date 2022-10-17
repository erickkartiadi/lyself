import { doc, getDoc, setDoc } from 'firebase/firestore';

import { User } from '../../../types/types';
import { createCollection } from '../../firebase/firebase';

type CreateUserDto = User;

export const usersCol = createCollection<User>('users');

export async function createUser(createUserDto: CreateUserDto) {
  const userDoc = doc(usersCol, createUserDto.uid);
  await setDoc(userDoc, createUserDto);
}

export async function getUser(uid: User['uid']): Promise<User | undefined> {
  const userDoc = doc(usersCol, uid);
  const querySnapshot = await getDoc(userDoc);

  return querySnapshot.data();
}
