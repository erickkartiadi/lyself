import axios from 'axios';

import { Todo } from '../../../types/types';

type CreateTodoDto = Omit<Todo, 'id'>;

export async function createTodo(createTodoDto: CreateTodoDto) {
  return axios.post('http://192.168.1.110:3000/todo', createTodoDto);
}

export async function deleteTodo(id: string) {
  return axios.delete(`http://192.168.1.110:3000/todo/${id}`);
}

export async function updateTodo(id: string, updateTodoDto: CreateTodoDto) {
  return axios.patch(`http://192.168.1.110:3000/todo/${id}`, updateTodoDto);
}

export async function toggleTodo(id: string, isCompleted: boolean) {
  console.log(isCompleted);

  return axios.patch(`http://192.168.1.110:3000/todo/toggle/${id}`, {
    isCompleted,
  });
}

export async function fetchTodo() {
  return axios.get('http://192.168.1.110:3000/todo');
}
