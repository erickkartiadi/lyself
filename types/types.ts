import { User as FirebaseUser } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

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
  creatorId: string;
  categoryId: string;
  isAnonymous: boolean;
  isCommentDisabled: boolean;
};

export type Category = {
  id: string;
  name: string;
  nameShort: string;
  storyIds: string[];
  storyCount: number;
};

export type Upvote = {
  userIds: string[];
  count: number;
};

export type User = Pick<FirebaseUser, 'displayName' | 'email' | 'photoURL' | 'uid'> & {
  likedStoryIds: string[];
  likedReplyIds: string[];
  savedStoryIds: string[];
};

export type UserStoryType = 'user' | 'liked' | 'saved';

export type Reply = {
  id: string;
  repliedId: Story['id'] | Reply['id'];
  reply: string;
  createdAt: Timestamp;
  userId: User['uid'];
};
