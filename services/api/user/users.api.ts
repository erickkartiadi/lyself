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
  console.log('fetch user 1x');

  const todoDoc = doc(usersCol, uid);
  const querySnapshot = await getDoc(todoDoc);

  return querySnapshot.data();
  // console.log(querySnapshot.data());

  // if(querySnapshot.exists()) {
  // return querySnapshot.data();
  // }

  // console.log();
}

// export async function getUser {}

export async function updateUser(id: string) {
  // const todoDoc = doc(usersCol, id);
  // await addDoc(todoDoc, {});
}
