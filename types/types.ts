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
  'diagnose',
  'forum',
  'meditation',
  'music',
  'todo',
] as const;

// custom primitive type
type Id = string | number;
type Name = string;
type Specialties = typeof SPECIALTIES[number];
type ActivityType = typeof ACTIVITY_TYPE[number];

// other types
type Playlist = {
  id: Id;
  creator: string;
  imageUrl: string;
  spotifyUrl: string;
  title: string;
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
  publisher: string;
  time: string;
  uri: string;
  url: string;
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
};
export { ACTIVITY_TYPE, SPECIALTIES };
