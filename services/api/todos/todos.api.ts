import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore';

import { Todo } from '../../../types/types';
import app from '../../firebase/firebase';

type CreateTodoDto = Omit<Todo, 'id'>;
type UpdateTodoDto = Todo;

const db = getFirestore(app);

export async function createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
  const todoRef = await addDoc(collection(db, 'todos'), createTodoDto);

  return { ...createTodoDto, id: todoRef.id } as Todo;
}

export async function deleteTodo(id: string): Promise<string> {
  await deleteDoc(doc(db, 'todos', id));
  return id;
}

export async function updateTodo({ id, ...rest }: UpdateTodoDto): Promise<Todo> {
  await setDoc(doc(db, 'todos', id), rest);

  return { id, ...rest };
}

export async function fetchTodos(): Promise<Todo[]> {
  const querySnapshot = await getDocs(collection(db, 'todos'));
  return querySnapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  })) as Todo[];
}
