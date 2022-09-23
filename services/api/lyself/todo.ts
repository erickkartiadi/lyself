import axios from 'axios';

import { Todo } from '../../../types/types';

// TODO add base url
type CreateTodoDto = Omit<Todo, 'id'>;
type UpdateTodoDto = Todo;

export async function createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
  const res = await axios.post('http://192.168.1.110:3000/todo', createTodoDto);

  return res.data;
}

export async function deleteTodo(id: string): Promise<Todo[]> {
  const res = await axios.delete(`http://192.168.1.110:3000/todo/${id}`);

  return res.data.todos;
}

export async function updateTodo({ id, ...others }: UpdateTodoDto): Promise<Todo[]> {
  const res = await axios.patch(`http://192.168.1.110:3000/todo/${id}`, others);

  return res.data.todos;
}

export async function fetchTodos(): Promise<Todo[]> {
  const res = await axios.get('http://192.168.1.110:3000/todo');

  return res.data.todos;
}
