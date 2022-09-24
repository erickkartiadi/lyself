import { ACTIVITY_TYPE, SPECIALTIES } from '../utils/constant/constant';

type Name = string;
type Specialties = typeof SPECIALTIES[number];
type ActivityType = typeof ACTIVITY_TYPE[number];

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

type Playlist = {
  id: string;
  creator: string;
  imageUrl: string;
  spotifyUrl: string;
  name: string;
};

type Activity = {
  id: string;
  title: string;
  time: string;
  activity: ActivityType;
};

type ProgressActivity = Activity & {
  progress: number;
};

type Review = {
  id: string;
  name: Name;
  review: string;
  time: string;
  uri: string;
};

type Education = {
  id: string;
  institutionName: string;
  startYear: number;
  studyPeriod: number;
  uri: string;
};

type Article = {
  title: string;
  source: string;
  publishedAt: string;
  url: string;
  urlToImage: string;
};

type Place = {
  id: string;
  address: string;
  googleMapLink: string;
  name: string;
  uri: string;
};

type Psychiatrist = {
  id: string;
  name: Name;
  uri: string;
  description: string;
  experience: number;
  rating: number;
  educations: Education[];
  otherSpecialties: Specialties[];
  place: Place;
  reviews: Review[];
  specialty: Specialties;

  patients: number;
};

type Appointment = Pick<Psychiatrist, 'name' | 'specialty' | 'uri'> & {
  date: Date;
  durationInMinutes: number;
};

type Schedule = {
  date: Date;
  availableHours: number[];
};

type Chat = {
  name: string;
  text: string;
  time: string;
  uri: string;
  unread: number;
};

type Status = {
  title: string;
  value: string;
  caption: string;
};

type TodoImportance = 'high' | 'medium' | 'low' | 'none';

type Todo = {
  id: string;
  todo: string;
  completed: boolean;
  importanceLevel: TodoImportance;
  note: string;
  reminderTime: Date | null;
};

export {
  Activity,
  ActivityType,
  Appointment,
  Article,
  Chat,
  Education,
  Playlist,
  ProgressActivity,
  Psychiatrist,
  Review,
  Schedule,
  Specialties,
  Status,
  Todo,
  TodoImportance,
  User,
};
export { ACTIVITY_TYPE, SPECIALTIES };
