import { Todo } from '../../../types/types';
import { apiClient } from '../../axios/axios';

type CreateTodoDto = Omit<Todo, 'id'>;
type UpdateTodoDto = Todo;

export async function createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
  const res = await apiClient.post('/todo', createTodoDto);

  return res.data;
}

export async function deleteTodo(id: string): Promise<Todo[]> {
  const res = await apiClient.delete(`/todo/${id}`);

  return res.data.todos;
}

export async function updateTodo({ id, ...others }: UpdateTodoDto): Promise<Todo[]> {
  const res = await apiClient.patch(`/todo/${id}`, others);

  return res.data.todos;
}

export async function fetchTodos(): Promise<Todo[]> {
  const res = await apiClient.get('/todo');

  return res.data.todos;
}
