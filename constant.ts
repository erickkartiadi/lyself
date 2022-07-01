import { Activities } from './components/ActivityIcon';

export type RecommendedProps = {
  id: string;
  activity: Activities;
  title: string;
  time: number;
};

export interface ArticleCardProps {
  title: string;
  publisher: string;
  time: string;
  src: string;
  url: string;
}

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
