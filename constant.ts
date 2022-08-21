import { Activities } from './components/ActivityIcon';

export type RecommendedProps = {
  id: string;
  activity: Activities;
  title: string;
  time: number;
};

export type ArticleCardProps = {
  title: string;
  publisher: string;
  time: string;
  src: string;
  url: string;
};

export const psychiatristData = [
  {
    uri: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: '4 years',
    name: 'Dr. Theres Webb',
  },
  {
    uri: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: '6 years',
    name: 'Dr. Usman Yousaf',
  },
  {
    uri: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: '3 years',
    name: 'Dr. Austin Distel',
  },
  {
    uri: 'https://images.unsplash.com/photo-1642050923713-c48db6ea4bec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: '5 years',
    name: 'Dr. Kirstin Watson',
  },
  {
    uri: 'https://images.unsplash.com/photo-1622253694238-3b22139576c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: '6 years',
    name: 'Dr. Bruno Rodrigues',
  },
  {
    uri: 'https://images.unsplash.com/photo-1576669801775-ff43c5ab079d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=360&q=80',
    experience: '2 years',
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
    title: 'Parental controls and kids mental health',
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
