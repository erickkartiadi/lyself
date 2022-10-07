import { Timestamp } from 'firebase/firestore';

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
