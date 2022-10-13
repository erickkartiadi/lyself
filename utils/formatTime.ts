import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Timestamp } from 'firebase/firestore';

dayjs.extend(relativeTime);

export function formatTimeAgo(
  date: string | number | dayjs.Dayjs | Date | null | undefined
) {
  return dayjs(date).fromNow();
}

export function formatReminderTime(date: Timestamp) {
  return dayjs(date.toDate()).format('DD MMM YYYY, hh:mm A');
}
