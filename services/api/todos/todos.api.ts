import { addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

import { Todo } from '../../../types/types';
import { auth, createCollection } from '../../firebase/firebase';

type CreateTodoDto = Omit<Todo, 'id'>;
type UpdateTodoDto = Todo;

const { currentUser } = auth;

const todosCol = (() => {
  if (!currentUser) throw new Error('Unauthorized');
  return createCollection<CreateTodoDto>('users', currentUser?.uid, 'todos');
})();

export async function createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
  const todoDoc = await addDoc(todosCol, createTodoDto);

  return { ...createTodoDto, id: todoDoc.id } as Todo;
}

export async function deleteTodo(id: string): Promise<string> {
  const todoDoc = doc(todosCol, id);

  await deleteDoc(todoDoc);

  return todoDoc.id;
}

export async function updateTodo({
  id,
  ...updatedTodoData
}: UpdateTodoDto): Promise<Todo> {
  const todoDoc = doc(todosCol, id);
  await updateDoc(todoDoc, updatedTodoData);

  return { id, ...updatedTodoData } as Todo;
}

export async function fetchTodos(): Promise<Todo[]> {
  const querySnapshot = await getDocs(todosCol);

  return querySnapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  })) as Todo[];
}
