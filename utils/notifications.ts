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
  title: string,
  body: string,
  currentReminderTime: Todo['reminderTime'],
  isCompleted: boolean
) {
  if (currentReminderTime && !isCompleted)
    await sendNotification(id, title, body, currentReminderTime.toDate());
  if (!currentReminderTime || isCompleted) {
    await cancelNotification(id);
  }
}
