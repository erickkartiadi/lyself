import { addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

import { Todo } from '../../../types/types';
import { todosColRef } from '../../firebase/firebase';

export type CreateTodoDto = Omit<Todo, 'id'>;
type UpdateTodoDto = Todo;

export async function createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
  const todoDocRef = await addDoc(todosColRef(), createTodoDto);

  return { ...createTodoDto, id: todoDocRef.id };
}

export async function deleteTodo(id: string): Promise<Todo['id']> {
  const todoDocRef = doc(todosColRef(), id);
  await deleteDoc(todoDocRef);

  return todoDocRef.id;
}

export async function updateTodo({
  id,
  ...updatedTodoData
}: UpdateTodoDto): Promise<Todo> {
  const todoDocRef = doc(todosColRef(), id);
  await updateDoc(todoDocRef, updatedTodoData);

  return { id, ...updatedTodoData };
}

export async function getTodos(): Promise<Todo[]> {
  const snapshot = await getDocs(todosColRef());

  return snapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  }));
}
