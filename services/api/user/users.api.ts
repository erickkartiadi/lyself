import { doc, getDoc, setDoc } from 'firebase/firestore';

import { User } from '../../../types/types';
import { createCollection } from '../../firebase/firebase';

type CreateUserDto = User;

const usersCol = createCollection<User>('users');

export async function createUser(createUserDto: CreateUserDto) {
  const todoDoc = doc(usersCol, createUserDto.uid);
  await setDoc(todoDoc, createUserDto);
}

export async function getUser(uid: User['uid']): Promise<User | undefined> {
  const todoDoc = doc(usersCol, uid);
  const querySnapshot = await getDoc(todoDoc);

  return querySnapshot.data();
}

export async function updateUser(id: string) {
  return '';
}
