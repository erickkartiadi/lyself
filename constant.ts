import { Activities } from './components/ActivityIcon';
import { ArticleCardProps } from './components/widget/ArticleCard';

export type RecommendedProps = {
  id: string;
  activity: Activities;
  title: string;
  time: number;
};

export type ProgressProps = {
  id: string;
  title: string;
  activityType: Activities;
  progress: number;
  time: string;
};

export const dataProgress: ProgressProps[] = [
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

export const chatData = [
  {
    name: 'Dr. Johny',
    text: 'Hello Erick, how can i help you?',
    time: '09:18 AM',
    unread: 2,
    avatar_url:
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Dr. Patrick S.',
    time: 'Yesterday',
    text: 'Sent an image',
    unread: 1,
    avatar_url:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Meg',
    time: 'Last week',
    text: 'This looks great!',
    unread: 0,
    avatar_url:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Kate Marks',
    time: 'April, 01 2022',
    text: '🎙️ Sent an audio',
    unread: 3,
    avatar_url:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Steve A.',
    time: 'January, 07 2022',
    text: '😂',
    unread: 0,
    avatar_url:
      'https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Dr. Harry S.',
    time: 'November, 28 2021',
    text: 'Thank you',
    unread: 0,
    avatar_url:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Dr. Ming ',
    time: 'August, 30 2021',
    text: 'Sent an receipt',
    unread: 0,
    avatar_url:
      'https://images.unsplash.com/photo-1580281658626-ee379f3cce93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Violetta K.',
    time: 'July, 05 2021',
    text: '🖼️ Sent an image',
    unread: 0,
    avatar_url:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
  {
    name: 'Bryan Ollifian',
    time: 'April, 03 2021',
    text: 'Thanks mate',
    unread: 0,
    avatar_url:
      'https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
  },
];

export const psychiatristData = [
  {
    uri: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: '4 year',
    name: 'Dr. Theres Webb',
  },
  {
    uri: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: '6 year',
    name: 'Dr. Usman Yousaf',
  },
  {
    uri: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: '3 year',
    name: 'Dr. Austin Distel',
  },
  {
    uri: 'https://images.unsplash.com/photo-1642050923713-c48db6ea4bec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: '5 year',
    name: 'Dr. Kirstin Watson',
  },
  {
    uri: 'https://images.unsplash.com/photo-1622253694238-3b22139576c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: '6 year',
    name: 'Dr. Bruno Rodrigues',
  },
  {
    uri: 'https://images.unsplash.com/photo-1576669801775-ff43c5ab079d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: '2 year',
    name: 'Dr. Floyd Miles',
  },
];

// image by: unsplash
export const dataArticles: ArticleCardProps[] = [
  {
    title: 'Supporting Employees Mental Health at Work',
    publisher: 'Rolling Stone',
    time: '1h',
    src: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80',
    url: 'https://www.rollingstone.com/culture-council/articles/supporting-employees-mental-health-work-1376097/',
  },
  {
    title: 'Parental controls, screen time, and kids mental health',
    publisher: 'Mashable',
    time: '1w',
    src: 'https://images.unsplash.com/photo-1554410637-1a8267402b57?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80',
    url: 'https://mashable.com/article/screen-time-parenting-styles-teen-mental-health',
  },
  {
    title: 'Mental Health: You must prioritise this!',
    publisher: 'Dailytrust',
    time: '7h',
    src: 'https://images.unsplash.com/photo-1620147512372-9e00421556bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80',
    url: 'https://dailytrust.com/mental-health-you-must-prioritise-this',
  },
  {
    title: 'Better mental health support for people in crisis',
    publisher: 'GOV.UK',
    time: '4d',
    src: 'https://images.unsplash.com/photo-1604881990409-b9f246db39da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80',
    url: 'https://www.gov.uk/government/news/better-mental-health-support-for-people-in-crisis',
  },
];

export const dataRecommended: RecommendedProps[] = [
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
