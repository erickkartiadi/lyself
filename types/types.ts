import { User as FirebaseUser } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

export type User = Pick<FirebaseUser, 'displayName' | 'email' | 'photoURL' | 'uid'>;

export type Playlist = {
  id: string;
  creator: string;
  imageUrl: string;
  spotifyUrl: string;
  name: string;
};

export type Article = {
  title: string;
  source: string;
  publishedAt: string;
  url: string;
  urlToImage: string;
};

export type TodoImportance = 'high' | 'medium' | 'low' | 'none';

export type Todo = {
  id: string;
  todo: string;
  completed: boolean;
  importanceLevel: TodoImportance;
  note: string;
  reminderTime: Timestamp | null;
};

export type Story = {
  id: string;
  title: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: string;
  anonymous: boolean;
  userId: string;
  categoryId: string;
};

export type Category = {
  id: string;
  label: string;
  labelShort: string;
  storyIds: string[];
};
