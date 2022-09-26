import { Todo } from '../types/types';

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

export const importanceLevelRank: {
  [key in Todo['importanceLevel']]: { level: number };
} = {
  high: {
    level: 3,
  },
  medium: {
    level: 2,
  },
  low: {
    level: 1,
  },
  none: {
    level: 0,
  },
};

export const sortReminderTime = (todos: Todo[], orderBy: OrderBy) => {
  const haveReminderTime = todos
    .filter((todo) => todo.reminderTime !== null)
    .sort((a, b) =>
      sortISOStringDate(
        a.reminderTime as unknown as string,
        b.reminderTime as unknown as string,
        orderBy
      )
    );

  const notHaveReminderTime = todos.filter((todo) => todo.reminderTime === null);

  return [...haveReminderTime, ...notHaveReminderTime];
};
