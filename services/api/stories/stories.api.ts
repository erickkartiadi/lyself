import {
  addDoc,
  arrayUnion,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';

import { Story } from '../../../types/types';
import { categoryColRef, storyColRef, upvoteColRef } from '../../firebase/firebase';

export type CreateStoryDto = Omit<Story, 'updatedAt' | 'id'>;

export async function getStories(
  pageParam: Story | null,
  categoryId: string
): Promise<Story[]> {
  if (!pageParam) return [];

  let q = query(storyColRef, orderBy('createdAt', 'desc'), limit(10));

  if (categoryId !== 'all') {
    const filteredQuery = query(q, where('categoryId', '==', categoryId));
    q = filteredQuery;
  }

  if (pageParam?.id !== null) {
    const currSnapshot = await getDoc(doc(storyColRef, pageParam.id));
    const nextQuery = query(q, startAfter(currSnapshot));
    q = nextQuery;
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  })) as Story[];
}

export async function createStory(createStoryDto: CreateStoryDto): Promise<void> {
  const newStoryRef = await addDoc(storyColRef, createStoryDto);
  await updateDoc(doc(categoryColRef, createStoryDto.categoryId), {
    storyIds: arrayUnion(newStoryRef.id),
    storyCount: increment(1),
  });
  await setDoc(doc(upvoteColRef, newStoryRef.id), {
    count: 0,
    userIds: [],
  });
}
