import 'react-native-get-random-values';

import { LoremIpsum } from 'lorem-ipsum';
import { names, uniqueNamesGenerator } from 'unique-names-generator';
import { v4 as uuidv4 } from 'uuid';

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const MONTHS = [
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

const generateLorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 6,
    min: 3,
  },
  wordsPerSentence: {
    max: 12,
    min: 6,
  },
});

function generateRandomNumber(from: number, to: number): number {
  const min = Math.ceil(from);
  const max = Math.floor(to);
  return Math.floor(Math.random() * (max - min) + min);
}

const generateRandomTimesAgo = (isWithAgo: boolean) => {
  const value = [
    generateRandomNumber(1, 24),
    generateRandomNumber(1, 59),
    generateRandomNumber(1, 59),
  ];

  const keys = ['h', 'm', 's'];

  const randIdx = generateRandomNumber(0, value.length);

  const result = `${value[randIdx]}${keys[randIdx]}`;
  return isWithAgo ? `${result} ago` : result;
};

const generateRandomDay = () => DAYS[generateRandomNumber(0, DAYS.length)];
const generateRandomMonth = () =>
  MONTHS[generateRandomNumber(0, MONTHS.length)];

const generateRandomName = () =>
  uniqueNamesGenerator({
    dictionaries: [names, names],
    separator: ' ',
    length: generateRandomNumber(0, 3),
    style: 'capital',
  });

const generateRandomImageUri = (size: number) =>
  `https://picsum.photos/id/${generateRandomNumber(1, 1000)}/${size}`;

const generateRandomPortraitUri = (size: number) =>
  `https://i.pravatar.cc/${size}?u=${generateRandomNumber(1, 100)}`;

const generateRandomUUID = () => uuidv4();

const generateRandomAddress = () =>
  `Jl. ${generateLorem.generateWords(
    generateRandomNumber(2, 3)
  )} No. ${generateRandomNumber(1, 99)}`;

export {
  generateLorem,
  generateRandomAddress,
  generateRandomDay,
  generateRandomImageUri,
  generateRandomMonth,
  generateRandomName,
  generateRandomNumber,
  generateRandomPortraitUri,
  generateRandomTimesAgo,
  generateRandomUUID,
};
