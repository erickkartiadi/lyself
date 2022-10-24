import 'react-native-get-random-values';

import Constants from 'expo-constants';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  getFirestore,
} from 'firebase/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  StorageReference,
  uploadBytes,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { Category, Reply, Story, Todo, Upvote, User } from '../../types/types';

const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.firebaseApiKey,
  authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
  projectId: Constants.manifest?.extra?.firebaseProjectId,
  storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
  appId: Constants.manifest?.extra?.firebaseAppId,
  measurementId: Constants.manifest?.extra?.firebaseMeasurementId,
};

const app = initializeApp(firebaseConfig);
export default app;

export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);

// create collection with typescript data type
export const createCollection = <T = DocumentData>(
  path: string,
  ...pathSegments: string[]
) => collection(db, path, ...pathSegments) as CollectionReference<T>;

export const upvoteColRef = createCollection<Upvote>('upvotes');
export const storyColRef = createCollection<Story>('stories');
export const categoryColRef = createCollection<Category>('categories');

export const usersColRef = createCollection<User>('users');

export const replyColRef = (storyId: string) =>
  createCollection<Reply>('replies', storyId, 'reply');
export const todosColRef = () => {
  const { currentUser } = auth;
  if (!currentUser) throw new Error('Unauthorized');
  return createCollection<Todo>('users', currentUser?.uid, 'todos');
};

export const currentUserDocRef = () => {
  const { currentUser } = auth;
  if (!currentUser) throw new Error('Unauthorized');
  return doc<User>(usersColRef, currentUser?.uid);
};

// STORAGE
export const storageRef = ref(storage);
export const profileRef = ref(storageRef, 'profiles/');
export const storyImageRef = ref(storageRef, 'story/');

export const uploadImageAsync = async (imageRef: StorageReference, uri: string) => {
  const blob = (await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = () => {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  })) as any;

  const currentRef = ref(imageRef, uuidv4());
  await uploadBytes(currentRef, blob);
  blob.close();

  return getDownloadURL(currentRef);
};
