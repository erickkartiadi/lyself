import { Colors } from '@rneui/themed';

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

const ACTIVITY_ICON: {
  [key: string]: {
    type: string;
    name: string;
    color: keyof Colors;
    iconSize: number;
  };
} = {
  meditation: {
    type: 'material-community',
    name: 'meditation',
    color: 'yellow',
    iconSize: 42,
  },
  consult: {
    type: 'font-awesome',
    name: 'stethoscope',
    color: 'primary',
    iconSize: 32,
  },
  stories: {
    type: 'material-community',
    name: 'forum',
    color: 'blue',
    iconSize: 26,
  },
  article: {
    type: 'ionicon',
    name: 'newspaper',
    color: 'error',
    iconSize: 30,
  },
  breathing: {
    type: 'entypo',
    name: 'air',
    color: 'blue',
    iconSize: 30,
  },
  diagnose: {
    type: 'font-awesome-5',
    name: 'diagnoses',
    color: 'yellow',
    iconSize: 26,
  },
  music: {
    type: 'material-community',
    name: 'music-note',
    color: 'purple',
    iconSize: 36,
  },
  todo: {
    type: 'ionicon',
    name: 'checkmark-done-sharp',
    color: 'success',
    iconSize: 32,
  },
  other: {
    type: 'material-icon',
    name: 'more-horiz',
    color: 'grey3',
    iconSize: 42,
  },
};

const SPECIALTIES = [
  'Addiction',
  'Child and adolescent',
  'Geriatric',
  'Forensic',
  'Neuropsychiatries',
  'Organizational',
  'Nurse practitioner',
] as const;

const ACTIVITY_TYPE = [
  'article',
  'breathing',
  'consult',
  'stories',
  'meditation',
  'music',
  'todo',
] as const;

export { ACTIVITY_ICON, ACTIVITY_TYPE, DAYS, MONTHS, SPECIALTIES };
