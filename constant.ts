import { Activities } from './components/RecommendedActivityCard';

export type RecommendedProps = {
  id: string;
  activity: Activities;
  title: string;
  time: number;
};

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
