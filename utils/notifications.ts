import * as Notifications from 'expo-notifications';

import { Todo } from '../types/types';

export async function sendNotification(
  id: string,
  title: string,
  body: string,
  date: Date
) {
  await Notifications.scheduleNotificationAsync({
    identifier: id,
    content: {
      title,
      body,
    },
    trigger: date,
  });
}

export async function cancelNotification(id: string) {
  await Notifications.cancelScheduledNotificationAsync(id);
}

export async function sendTodoReminderNotification(
  id: string,
  body: string,
  currentReminderTime: Todo['reminderTime'],
  completed: Todo['completed']
) {
  if (currentReminderTime && !completed)
    await sendNotification(id, 'Todo Reminder', body, currentReminderTime.toDate());
  if (!currentReminderTime || completed) {
    await cancelNotification(id);
  }
}
