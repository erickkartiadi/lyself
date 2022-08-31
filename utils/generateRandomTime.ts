// for placeholder only
import generateRandomNumber from './generateRandomNumber';

const generateTimesAgo = () => {
  const generator = [
    `${generateRandomNumber(1, 59)}m`,
    `${generateRandomNumber(1, 23)}h`,
    `${generateRandomNumber(1, 30)}d`,
  ];

  return `${generator[generateRandomNumber(0, generator.length)]} ago`;
};

const generateRandomDay = () => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return days[generateRandomNumber(0, 7)];
};

const generateRandomMonth = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return months[generateRandomNumber(0, 7)];
};

export { generateRandomDay, generateRandomMonth, generateTimesAgo };
