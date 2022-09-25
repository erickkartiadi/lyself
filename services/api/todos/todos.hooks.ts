import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Todo } from '../../../types/types';
import { createTodo, deleteTodo, fetchTodos, updateTodo } from './todos.api';

export const useGetTodos = () => useQuery<Todo[]>(['todos'], fetchTodos);

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(createTodo, {
    onSuccess: (newTodo: Todo) => {
      queryClient.setQueryData<Todo[]>(['todos'], (oldTodos) => [
        ...(oldTodos || []),
        newTodo,
      ]);
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(updateTodo, {
    onSuccess: (todos) => queryClient.setQueriesData(['todos'], todos),
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteTodo, {
    onSuccess: (todos) => {
      queryClient.setQueriesData(['todos'], todos);
    },
  });
};
