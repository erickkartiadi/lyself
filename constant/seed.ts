import dayjs from 'dayjs';

import {
  Activity,
  ACTIVITY_TYPE,
  Appointment,
  Chat,
  ProgressActivity,
  Psychiatrist,
  Schedule,
  SPECIALTIES,
} from '../types/types';
import {
  generateLorem,
  generateRandomAddress,
  generateRandomImageUri,
  generateRandomName,
  generateRandomNumber,
  generateRandomPortraitUri,
  generateRandomPsychiatristUri,
  generateRandomTimesAgo,
  generateRandomUUID,
} from '../utils/generateRandom';

export const user = {
  name: 'Erick Kartiadi',
  email: 'erickcartiady@gmail.com',
  uri: generateRandomImageUri(100),
};

export const progressData: ProgressActivity[] = new Array(generateRandomNumber(1, 4))
  .fill({})
  .map(() => ({
    id: generateRandomUUID(),
    title: generateLorem.generateWords(generateRandomNumber(2, 3)),
    activity: ACTIVITY_TYPE[generateRandomNumber(0, ACTIVITY_TYPE.length)],
    progress: generateRandomNumber(0, 100),
    time: generateRandomTimesAgo(false),
  }));
const minutes = [0, 30];
const appointmentData: Appointment[] = new Array(10).fill({}).map(() => ({
  name: `Dr. ${generateRandomName()}`,
  uri: generateRandomPsychiatristUri(),
  specialty: SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
  date: new Date(
    2022,
    generateRandomNumber(0, 12),
    generateRandomNumber(0, 30),
    generateRandomNumber(1, 24),
    minutes[generateRandomNumber(0, minutes.length)]
  ),
  durationInMinutes: 60,
}));

export const scheduleData: Schedule[] = new Array(20)
  .fill({})
  .map(() => ({
    date: new Date(
      2022,
      generateRandomNumber(0, 12),
      generateRandomNumber(0, 30),
      generateRandomNumber(1, 24)
    ),
    availableHours: [
      ...new Set(
        new Array(generateRandomNumber(1, 24))
          .fill(0)
          .map(() => generateRandomNumber(0, 24))
          .sort((a, b) => a - b)
      ),
    ],
  }))
  .sort((a, b) => Date.parse(a.date.toUTCString()) - Date.parse(b.date.toUTCString()));

export const upcomingAppointmentData = appointmentData
  .filter((each) =>
    dayjs(each.date).add(each.durationInMinutes, 'minute').isAfter(dayjs(), 'minute')
  )
  .sort((a, b) => Date.parse(a.date.toUTCString()) - Date.parse(b.date.toUTCString()));

export const completedAppointmentData = appointmentData
  .filter((each) =>
    dayjs(each.date).add(each.durationInMinutes, 'minute').isBefore(dayjs(), 'minute')
  )
  .sort((a, b) => Date.parse(b.date.toUTCString()) - Date.parse(a.date.toUTCString()));

export const psychiatristData: Array<Psychiatrist> = new Array(generateRandomNumber(4, 7))
  .fill({})
  .map(() => ({
    id: generateRandomUUID(),
    uri: generateRandomPsychiatristUri(),
    experience: generateRandomNumber(1, 12),
    rating: generateRandomNumber(80, 100),
    patients: generateRandomNumber(20, 100),
    name: `Dr. ${generateRandomName()}`,
    description: generateLorem.generateParagraphs(1),
    specialty: SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
    otherSpecialties: [
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
      SPECIALTIES[generateRandomNumber(0, SPECIALTIES.length)],
    ],
    place: {
      id: generateRandomUUID(),
      address: generateRandomAddress(),
      googleMapLink: '',
      uri: generateRandomImageUri(300),
      name: generateLorem.generateWords(generateRandomNumber(3, 4)),
    },
    reviews: new Array(generateRandomNumber(3, 6)).fill({}).map(() => ({
      id: generateRandomUUID(),
      uri: generateRandomPortraitUri(100),
      name: generateRandomName(),
      review: generateLorem.generateWords(16),
      time: generateRandomTimesAgo(true),
    })),
    educations: new Array(generateRandomNumber(1, 4)).fill({}).map(() => ({
      id: generateRandomUUID(),
      institutionName: `Univ. ${generateLorem.generateWords(generateRandomNumber(1, 3))}`,
      uri: generateRandomImageUri(100),
      startYear: generateRandomNumber(1980, 2022),
      studyPeriod: generateRandomNumber(2, 5),
    })),
  }));

export const chatData: Chat[] = [
  {
    name: 'Dr. Johny',
    text: 'Hello Erick, how can i help you?',
    time: '09:18 AM',
    unread: 2,
    uri: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Dr. Patrick S.',
    time: 'Yesterday',
    text: 'Sent an image',
    unread: 1,
    uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Meg',
    time: 'Last week',
    text: 'This looks great!',
    unread: 0,
    uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Kate Marks',
    time: 'April, 01 2022',
    text: '🎙️ Sent an audio',
    unread: 3,
    uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Steve A.',
    time: 'January, 07 2022',
    text: '😂',
    unread: 0,
    uri: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Dr. Harry S.',
    time: 'November, 28 2021',
    text: 'Thank you',
    unread: 0,
    uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Dr. Ming ',
    time: 'August, 30 2021',
    text: 'Sent an receipt',
    unread: 0,
    uri: 'https://images.unsplash.com/photo-1580281658626-ee379f3cce93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Violetta K.',
    time: 'July, 05 2021',
    text: '🖼️ Sent an image',
    unread: 0,
    uri: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Bryan Ollifian',
    time: 'April, 03 2021',
    text: 'Thanks mate',
    unread: 0,
    uri: 'https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
];

export const recommendedData: Activity[] = new Array(generateRandomNumber(3, 5))
  .fill({})
  .map(() => ({
    id: generateRandomUUID(),
    activity: ACTIVITY_TYPE[generateRandomNumber(0, ACTIVITY_TYPE.length)],
    title: generateLorem.generateWords(2),
    time: generateRandomTimesAgo(false),
  }));
