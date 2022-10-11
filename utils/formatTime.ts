import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Timestamp } from 'firebase/firestore';

import { Todo } from '../types/types';

dayjs.extend(relativeTime);

export function formatTimeAgo(
  date: string | number | dayjs.Dayjs | Date | null | undefined
) {
  return dayjs(date).fromNow();
}

export function formatReminderTime(date: Todo['reminderTime']) {
  const currDate = date instanceof Timestamp ? date.toDate() : date;
  return dayjs(currDate).format('DD MMM YYYY, hh:mm A');
}
