import 'react-native-get-random-values';

import { LoremIpsum } from 'lorem-ipsum';
import { names, uniqueNamesGenerator } from 'unique-names-generator';
import { v4 as uuidv4 } from 'uuid';

import { DAYS, MONTHS } from './constant/constant';

const PSYCHIATRIST_AVATAR_URI = [
  'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/5214995/pexels-photo-5214995.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/7904485/pexels-photo-7904485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/8560209/pexels-photo-8560209.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/4098150/pexels-photo-4098150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/7176320/pexels-photo-7176320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/4989166/pexels-photo-4989166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/5998466/pexels-photo-5998466.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/8460090/pexels-photo-8460090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/5998474/pexels-photo-5998474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/5452292/pexels-photo-5452292.jpeg?auto=compress&cs=tinysrgb&w=1600',
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
const generateRandomMonth = () => MONTHS[generateRandomNumber(0, MONTHS.length)];

const generateRandomName = () =>
  uniqueNamesGenerator({
    dictionaries: [names, names, names],
    separator: ' ',
    length: generateRandomNumber(0, 4),
    style: 'capital',
  });

const generateRandomPsychiatristUri = () =>
  PSYCHIATRIST_AVATAR_URI[generateRandomNumber(0, PSYCHIATRIST_AVATAR_URI.length)];

const generateRandomImageUri = (size: number) =>
  `https://picsum.photos/id/${generateRandomNumber(1, 100)}/${size}`;

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
  generateRandomPsychiatristUri,
  generateRandomTimesAgo,
  generateRandomUUID,
};
