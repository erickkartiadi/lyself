import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

function formatTimeAgo(date: string) {
  return dayjs(date).fromNow();
}

export default formatTimeAgo;
