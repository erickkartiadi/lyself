import { Activities } from '../components/ActivityIcon';
import generateRandomNumber from '../utils/generateRandomNumber';
import lorem from '../utils/generateLoremIpsum';
import generateRandomName from '../utils/generateRandomName';
import {
  generateRandomDay,
  generateRandomMonth,
  generateTimesAgo,
} from '../utils/generateRandomTime';
import { PsychiatristCardProps } from '../components/cards/PsychiatristCard';
import { ProgressCardProps } from '../components/cards/ProgressCard';
import { ArticleCardProps } from '../components/cards/ArticleCard';

export const progressData: ProgressCardProps[] = [
  {
    id: '1',
    title: 'Relax',
    activityType: 'breathing',
    progress: 67,
    time: '1m 30s',
  },
  {
    id: '2',
    title: 'Morning meditation',
    activityType: 'meditation',
    progress: 90,
    time: '1m',
  },
  {
    id: '3',
    title: 'Chill vibes',
    activityType: 'music',
    progress: 40,
    time: '15m',
  },
];

export type RecommendedProps = {
  id: string;
  activity: Activities;
  title: string;
  time: number;
};

const SPECIALTIES = [
  'Addiction',
  'Child and adolescent',
  'Geriatric',
  'Forensic',
  'Neuropsychiatries',
  'Organizational',
  'Nurse practitioner',
];

export const scheduleData = {
  psychiatristName: `Dr. ${generateRandomName()}`,
  specialty: SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
  date: `${generateRandomDay().slice(0, 3)}, ${generateRandomNumber(
    1,
    30
  )} ${generateRandomMonth()}`,
  time: '13:00 - 14:30',
};

const randomAddress = `Jl. ${lorem.generateWords(
  generateRandomNumber(2, 3)
)} No. ${generateRandomNumber(1, 99)}`;

export const psychiatristData: PsychiatristCardProps[] = [
  {
    uri: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: generateRandomNumber(1, 12),
    rating: generateRandomNumber(80, 100),
    patients: generateRandomNumber(20, 100),
    name: 'Dr. Usman Yousaf',
    description: lorem.generateParagraphs(1),
    specialty: SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
    otherSpecialties: [
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
    ],
    psychiatristLocation: {
      address: randomAddress,
      link: '',
      uri: 'https://picsum.photos/360',
      name: lorem.generateWords(generateRandomNumber(3, 4)),
    },
    reviews: [
      {
        uri: `https://picsum.photos/id/${generateRandomNumber(1, 100)}/100`,
        name: generateRandomName(),
        review: lorem.generateWords(16),
        time: generateTimesAgo(),
      },
      {
        uri: `https://picsum.photos/id/${generateRandomNumber(1, 100)}/100`,
        name: generateRandomName(),
        review: lorem.generateWords(16),
        time: generateTimesAgo(),
      },
      {
        uri: `https://picsum.photos/id/${generateRandomNumber(1, 100)}/100`,
        name: generateRandomName(),
        review: lorem.generateWords(16),
        time: generateTimesAgo(),
      },
      {
        uri: `https://picsum.photos/id/${generateRandomNumber(1, 100)}/100`,
        name: generateRandomName(),
        review: lorem.generateWords(16),
        time: generateTimesAgo(),
      },
    ],
    educations: [
      {
        id: 1,
        institutionName: 'Universitas Indonesia',
        uri: 'https://upload.wikimedia.org/wikipedia/id/thumb/0/0f/Makara_of_Universitas_Indonesia.svg/1200px-Makara_of_Universitas_Indonesia.svg.png',
        startYear: generateRandomNumber(1980, 2022),
        studyPeriod: generateRandomNumber(2, 5),
      },
      {
        id: 2,
        institutionName: 'Universitas Bina Nusantara',
        uri: 'https://rekreartive.com/wp-content/uploads/2018/10/Logo-Binus-University-Universitas-Bina-Nusantara-Original-PNG.png',
        startYear: generateRandomNumber(1980, 2022),
        studyPeriod: generateRandomNumber(2, 5),
      },
    ],
  },
  {
    uri: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: generateRandomNumber(1, 12),
    rating: generateRandomNumber(80, 100),
    patients: generateRandomNumber(20, 100),
    name: 'Dr. Austin Distel',
    description: lorem.generateParagraphs(1),
    specialty: SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
    otherSpecialties: [
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
    ],
    psychiatristLocation: {
      address: randomAddress,
      link: '',
      uri: 'https://picsum.photos/360',
      name: lorem.generateWords(generateRandomNumber(3, 4)),
    },
    reviews: [
      {
        uri: `https://picsum.photos/id/${generateRandomNumber(1, 100)}/100`,
        name: generateRandomName(),
        review: lorem.generateWords(16),
        time: generateTimesAgo(),
      },
      {
        uri: `https://picsum.photos/id/${generateRandomNumber(1, 100)}/100`,
        name: generateRandomName(),
        review: lorem.generateWords(16),
        time: generateTimesAgo(),
      },
      {
        uri: `https://picsum.photos/id/${generateRandomNumber(1, 100)}/100`,
        name: generateRandomName(),
        review: lorem.generateWords(16),
        time: generateTimesAgo(),
      },
      {
        uri: `https://picsum.photos/id/${generateRandomNumber(1, 100)}/100`,
        name: generateRandomName(),
        review: lorem.generateWords(16),
        time: generateTimesAgo(),
      },
    ],
    educations: [
      {
        id: 1,
        institutionName: 'Universitas Indonesia',
        uri: 'https://upload.wikimedia.org/wikipedia/id/thumb/0/0f/Makara_of_Universitas_Indonesia.svg/1200px-Makara_of_Universitas_Indonesia.svg.png',
        startYear: generateRandomNumber(1980, 2022),
        studyPeriod: generateRandomNumber(2, 5),
      },
      {
        id: 2,
        institutionName: 'Universitas Bina Nusantara',
        uri: 'https://rekreartive.com/wp-content/uploads/2018/10/Logo-Binus-University-Universitas-Bina-Nusantara-Original-PNG.png',
        startYear: generateRandomNumber(1980, 2022),
        studyPeriod: generateRandomNumber(2, 5),
      },
    ],
  },
  {
    uri: 'https://images.unsplash.com/photo-1642050923713-c48db6ea4bec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: generateRandomNumber(1, 12),
    rating: generateRandomNumber(80, 100),
    patients: generateRandomNumber(20, 100),
    name: 'Dr. Kirstin Watson',
    description: lorem.generateParagraphs(1),
    specialty: SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
    otherSpecialties: [
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
    ],
    psychiatristLocation: {
      address: randomAddress,
      link: '',
      uri: 'https://picsum.photos/360',
      name: lorem.generateWords(generateRandomNumber(3, 4)),
    },
    reviews: [
      {
        uri: `https://picsum.photos/id/${generateRandomNumber(1, 100)}/100`,
        name: generateRandomName(),
        review: lorem.generateWords(16),
        time: generateTimesAgo(),
      },
      {
        uri: `https://picsum.photos/id/${generateRandomNumber(1, 100)}/100`,
        name: generateRandomName(),
        review: lorem.generateWords(16),
        time: generateTimesAgo(),
      },
      {
        uri: `https://picsum.photos/id/${generateRandomNumber(1, 100)}/100`,
        name: generateRandomName(),
        review: lorem.generateWords(16),
        time: generateTimesAgo(),
      },
      {
        uri: `https://picsum.photos/id/${generateRandomNumber(1, 100)}/100`,
        name: generateRandomName(),
        review: lorem.generateWords(16),
        time: generateTimesAgo(),
      },
    ],
    educations: [
      {
        id: 1,
        institutionName: 'Universitas Indonesia',
        uri: 'https://upload.wikimedia.org/wikipedia/id/thumb/0/0f/Makara_of_Universitas_Indonesia.svg/1200px-Makara_of_Universitas_Indonesia.svg.png',
        startYear: generateRandomNumber(1980, 2022),
        studyPeriod: generateRandomNumber(2, 5),
      },
      {
        id: 2,
        institutionName: 'Universitas Bina Nusantara',
        uri: 'https://rekreartive.com/wp-content/uploads/2018/10/Logo-Binus-University-Universitas-Bina-Nusantara-Original-PNG.png',
        startYear: generateRandomNumber(1980, 2022),
        studyPeriod: generateRandomNumber(2, 5),
      },
    ],
  },
  {
    uri: 'https://images.unsplash.com/photo-1622253694238-3b22139576c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: generateRandomNumber(1, 12),
    rating: generateRandomNumber(80, 100),
    patients: generateRandomNumber(20, 100),
    name: 'Dr. Bruno Rodrigues',
    description: lorem.generateParagraphs(1),
    specialty: SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
    otherSpecialties: [
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
    ],
    psychiatristLocation: {
      address: randomAddress,
      link: '',
      uri: 'https://picsum.photos/360',
      name: lorem.generateWords(generateRandomNumber(3, 4)),
    },
    reviews: [
      {
        uri: `https://picsum.photos/id/${generateRandomNumber(1, 100)}/100`,
        name: generateRandomName(),
        review: lorem.generateWords(16),
        time: generateTimesAgo(),
      },
      {
        uri: `https://picsum.photos/id/${generateRandomNumber(1, 100)}/100`,
        name: generateRandomName(),
        review: lorem.generateWords(16),
        time: generateTimesAgo(),
      },
      {
        uri: `https://picsum.photos/id/${generateRandomNumber(1, 100)}/100`,
        name: generateRandomName(),
        review: lorem.generateWords(16),
        time: generateTimesAgo(),
      },
      {
        uri: `https://picsum.photos/id/${generateRandomNumber(1, 100)}/100`,
        name: generateRandomName(),
        review: lorem.generateWords(16),
        time: generateTimesAgo(),
      },
    ],
    educations: [
      {
        id: 1,
        institutionName: 'Universitas Indonesia',
        uri: 'https://upload.wikimedia.org/wikipedia/id/thumb/0/0f/Makara_of_Universitas_Indonesia.svg/1200px-Makara_of_Universitas_Indonesia.svg.png',
        startYear: generateRandomNumber(1980, 2022),
        studyPeriod: generateRandomNumber(2, 5),
      },
      {
        id: 2,
        institutionName: 'Universitas Bina Nusantara',
        uri: 'https://rekreartive.com/wp-content/uploads/2018/10/Logo-Binus-University-Universitas-Bina-Nusantara-Original-PNG.png',
        startYear: generateRandomNumber(1980, 2022),
        studyPeriod: generateRandomNumber(2, 5),
      },
    ],
  },
  {
    uri: 'https://images.unsplash.com/photo-1576669801775-ff43c5ab079d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: generateRandomNumber(1, 12),
    rating: generateRandomNumber(80, 100),
    patients: generateRandomNumber(20, 100),
    name: 'Dr. Floyd Miles',
    description: lorem.generateParagraphs(1),
    specialty: SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
    otherSpecialties: [
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
    ],
    psychiatristLocation: {
      address: randomAddress,
      link: '',
      uri: 'https://picsum.photos/360',
      name: lorem.generateWords(generateRandomNumber(3, 4)),
    },
    reviews: [
      {
        uri: `https://picsum.photos/id/${generateRandomNumber(1, 100)}/100`,
        name: generateRandomName(),
        review: lorem.generateWords(16),
        time: generateTimesAgo(),
      },
      {
        uri: `https://picsum.photos/id/${generateRandomNumber(1, 100)}/100`,
        name: generateRandomName(),
        review: lorem.generateWords(16),
        time: generateTimesAgo(),
      },
      {
        uri: `https://picsum.photos/id/${generateRandomNumber(1, 100)}/100`,
        name: generateRandomName(),
        review: lorem.generateWords(16),
        time: generateTimesAgo(),
      },
      {
        uri: `https://picsum.photos/id/${generateRandomNumber(1, 100)}/100`,
        name: generateRandomName(),
        review: lorem.generateWords(16),
        time: generateTimesAgo(),
      },
    ],
    educations: [
      {
        id: 1,
        institutionName: 'Universitas Indonesia',
        uri: 'https://upload.wikimedia.org/wikipedia/id/thumb/0/0f/Makara_of_Universitas_Indonesia.svg/1200px-Makara_of_Universitas_Indonesia.svg.png',
        startYear: generateRandomNumber(1980, 2022),
        studyPeriod: generateRandomNumber(2, 5),
      },
      {
        id: 2,
        institutionName: 'Universitas Bina Nusantara',
        uri: 'https://rekreartive.com/wp-content/uploads/2018/10/Logo-Binus-University-Universitas-Bina-Nusantara-Original-PNG.png',
        startYear: generateRandomNumber(1980, 2022),
        studyPeriod: generateRandomNumber(2, 5),
      },
    ],
  },
];

// image by: unsplash
export const articlesData: ArticleCardProps[] = [
  {
    title: 'Supporting Employees Mental Health at Work',
    publisher: 'Rolling Stone',
    time: '1h',
    uri: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80',
    url: 'https://www.rollingstone.com/culture-council/articles/supporting-employees-mental-health-work-1376097/',
  },
  {
    title: 'Parental controls and kids mental health',
    publisher: 'Mashable',
    time: '1w',
    uri: 'https://images.unsplash.com/photo-1554410637-1a8267402b57?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80',
    url: 'https://mashable.com/article/screen-time-parenting-styles-teen-mental-health',
  },
  {
    title: 'Mental Health: You must prioritise this!',
    publisher: 'Dailytrust',
    time: '7h',
    uri: 'https://images.unsplash.com/photo-1620147512372-9e00421556bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80',
    url: 'https://dailytrust.com/mental-health-you-must-prioritise-this',
  },
  {
    title: 'Better mental health support for people in crisis',
    publisher: 'GOV.UK',
    time: '4d',
    uri: 'https://images.unsplash.com/photo-1604881990409-b9f246db39da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80',
    url: 'https://www.gov.uk/government/news/better-mental-health-support-for-people-in-crisis',
  },
];

export const recommendedData: RecommendedProps[] = [
  {
    id: '1',
    activity: 'meditation',
    title: 'Calm mind',
    time: 5,
  },
  {
    id: '2',
    activity: 'music',
    title: 'Morning beats',
    time: 15,
  },
  {
    id: '3',
    activity: 'breathing',
    title: 'Breathing',
    time: 10,
  },
  {
    id: '4',
    activity: 'article',
    title: 'Reading',
    time: 20,
  },
];
