import { ACTIVITY_TYPE, SPECIALTIES } from '../constant/constant';

// custom primitive type
type Id = string | number;
type Name = string;
type Specialties = typeof SPECIALTIES[number];
type ActivityType = typeof ACTIVITY_TYPE[number];

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// other types
type Playlist = {
  id: Id;
  creator: string;
  imageUrl: string;
  spotifyUrl: string;
  name: string;
};

type Activity = {
  id: Id;
  title: string;
  time: string;
  activity: ActivityType;
};

type ProgressActivity = Activity & {
  progress: number;
};

type Review = {
  id: Id;
  name: Name;
  review: string;
  time: string;
  uri: string;
};

type Education = {
  id: Id;
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
  id: Id;
  address: string;
  googleMapLink: string;
  name: string;
  uri: string;
};

type Psychiatrist = {
  id: Id;
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

  // TODO change patients to Patient[]
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
  User,
};
export { ACTIVITY_TYPE, SPECIALTIES };
