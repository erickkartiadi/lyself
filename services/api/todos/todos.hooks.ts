import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Todo } from '../../../types/types';
import {
  importanceLevelRank,
  OrderBy,
  sortNumber,
  sortReminderTime,
  TodoFilter,
  TodoSort,
} from '../../../utils/sort';
import { createTodo, deleteTodo, fetchTodos, updateTodo } from './todos.api';

export const useGetTodos = (
  filter: TodoFilter,
  sort: TodoSort,
  orderBy: OrderBy = 'ASC'
) =>
  useQuery<Todo[]>(['todos'], fetchTodos, {
    select: (data) => {
      let filtered = data;
      if (filter !== 'All') {
        const isCompleted = filter === 'Completed';
        filtered = filtered.filter(({ completed }) => completed === isCompleted);
      }

      const sorted = filtered.sort((a, b) =>
        sortNumber(
          importanceLevelRank[a.importanceLevel].level,
          importanceLevelRank[b.importanceLevel].level,
          orderBy
        )
      );

      if (sort === 'reminderTime') {
        return sortReminderTime(sorted, orderBy);
      }

      return sorted;
    },
  });

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
