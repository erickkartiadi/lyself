import { ACTIVITY_TYPE, SPECIALTIES } from '../utils/constant/constant';

export type Name = string;
export type Specialties = typeof SPECIALTIES[number];
export type ActivityType = typeof ACTIVITY_TYPE[number];

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Playlist = {
  id: string;
  creator: string;
  imageUrl: string;
  spotifyUrl: string;
  name: string;
};

export type Activity = {
  id: string;
  title: string;
  time: string;
  activity: ActivityType;
};

export type ProgressActivity = Activity & {
  progress: number;
};

export type Review = {
  id: string;
  name: Name;
  review: string;
  time: string;
  uri: string;
};

export type Education = {
  id: string;
  institutionName: string;
  startYear: number;
  studyPeriod: number;
  uri: string;
};

export type Article = {
  title: string;
  source: string;
  publishedAt: string;
  url: string;
  urlToImage: string;
};

export type Place = {
  id: string;
  address: string;
  googleMapLink: string;
  name: string;
  uri: string;
};

export type Psychiatrist = {
  id: string;
  name: Name;
  uri: string;
  description: string;
  experience: number;
  rating: number;
  educations: Education[];
  place: Place;
  reviews: Review[];
  specialty: Specialties;

  patients: number;
};

export type Appointment = Pick<Psychiatrist, 'name' | 'specialty' | 'uri'> & {
  date: Date;
  durationInMinutes: number;
};

export type Schedule = {
  date: Date;
  availableHours: number[];
};

export type Chat = {
  name: string;
  text: string;
  time: string;
  uri: string;
  unread: number;
};

export type Status = {
  title: string;
  value: string;
  caption: string;
};

export type TodoImportance = 'high' | 'medium' | 'low' | 'none';

export type Todo = {
  id: string;
  todo: string;
  completed: boolean;
  importanceLevel: TodoImportance;
  note: string;
  reminderTime: Date | null;
};
