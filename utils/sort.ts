import { Timestamp } from 'firebase/firestore';

import { Todo, TodoImportance } from '../types/types';

export type OrderBy = 'ASC' | 'DESC';

export const sortNumber = (a: number, b: number, orderBy: OrderBy) =>
  orderBy === 'ASC' ? a - b : b - a;

export const sortISOStringDate = (
  dateA: string,
  dateB: string,
  orderBy: OrderBy = 'ASC'
) => {
  if (dateA < dateB) {
    return orderBy === 'ASC' ? -1 : 1;
  }
  if (dateA > dateB) {
    return orderBy === 'ASC' ? 1 : -1;
  }
  return 0;
};

export type TodoSort = 'importanceLevel' | 'reminderTime';
export type TodoFilter = 'Completed' | 'Todo' | 'All';

export const importanceLevels: TodoImportance[] = ['none', 'low', 'medium', 'high'];

export const sortReminderTime = (todos: Todo[], orderBy: OrderBy) => {
  const haveReminderTime = todos
    .filter((todo) => todo.reminderTime !== null)
    .sort((a, b) =>
      sortNumber(
        a.reminderTime?.seconds as Timestamp['seconds'],
        b.reminderTime?.seconds as Timestamp['seconds'],
        orderBy
      )
    );

  const notHaveReminderTime = todos.filter((todo) => todo.reminderTime === null);

  return [...haveReminderTime, ...notHaveReminderTime];
};
