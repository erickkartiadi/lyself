import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Todo } from '../../../types/types';
import {
  cancelNotification,
  sendTodoReminderNotification,
} from '../../../utils/notifications';
import {
  importanceLevels,
  OrderBy,
  sortNumber,
  sortReminderTime,
  TodoFilter,
  TodoSort,
} from '../../../utils/sort';
import { somethingWentWrongToast } from '../../../utils/toast';
import { createTodo, deleteTodo, fetchTodos, updateTodo } from './todos.api';

export const useGetTodos = (
  filter: TodoFilter,
  sort: TodoSort,
  orderBy: OrderBy = 'ASC',
  limit?: number
) =>
  useQuery<Todo[]>(['todos'], fetchTodos, {
    select: (data) => {
      let filtered = data;
      if (filter !== 'All') {
        const isCompleted = filter === 'Completed';
        filtered = filtered.filter(({ completed }) => completed === isCompleted);
      }

      const sorted = filtered
        .sort((a, b) =>
          sortNumber(
            importanceLevels.findIndex((importance) => importance === a.importanceLevel),
            importanceLevels.findIndex((importance) => importance === b.importanceLevel),
            orderBy
          )
        )
        // completed todos are always below
        .sort((a, b) => sortNumber(Number(a.completed), Number(b.completed), 'ASC'));

      if (sort === 'reminderTime') {
        return sortReminderTime(sorted, orderBy);
      }

      return sorted.slice(0, limit);
    },
  });

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(createTodo, {
    onSuccess: (newTodo: Todo) => {
      sendTodoReminderNotification(
        newTodo.id,
        newTodo.todo,
        newTodo.reminderTime,
        newTodo.completed
      );

      queryClient.setQueryData<Todo[]>(['todos'], (oldTodos) => [
        ...(oldTodos || []),
        newTodo,
      ]);
    },
    onError: () => {
      somethingWentWrongToast();
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(updateTodo, {
    onSuccess: (todo) => {
      sendTodoReminderNotification(todo.id, todo.todo, todo.reminderTime, todo.completed);

      queryClient.setQueryData<Todo[]>(['todos'], (oldTodos) =>
        oldTodos?.map((oldTodo) => {
          if (oldTodo.id === todo.id) return { ...oldTodo, ...todo };
          return oldTodo;
        })
      );
    },
    onError: () => {
      somethingWentWrongToast();
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteTodo, {
    onSuccess: (todoId) => {
      cancelNotification(todoId);

      queryClient.setQueryData<Todo[]>(['todos'], (oldTodos) =>
        oldTodos?.filter((todo) => todo.id !== todoId)
      );
    },
    onError: () => {
      somethingWentWrongToast();
    },
  });
};
