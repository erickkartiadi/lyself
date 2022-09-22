import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function formatTimeAgo(date: string) {
  return dayjs(date).fromNow();
}

export function formatReminderTime(date: Date) {
  return dayjs(date).format('DD MMM YYYY, hh:mm A');
}
