import {
  addDoc,
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';

import { Category, Story, User } from '../../../types/types';
import { categoryColRef, storyColRef, usersColRef } from '../../firebase/firebase';

export type CreateStoryDto = Omit<Story, 'updatedAt' | 'id'>;
export type LikeStoryDto = Pick<Story, 'id'> & {
  currentUserId: User['uid'];
  cancelLike: boolean;
};
export type CreateCategoryDto = Omit<Category, 'id'>;

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

  // first data
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
  });
}

export async function likeStory({
  id,
  currentUserId,
  cancelLike,
}: LikeStoryDto): Promise<void> {
  const userDocRef = doc(usersColRef, currentUserId);
  const storyDocRef = doc(storyColRef, id);

  await updateDoc(userDocRef, {
    likedStoryIds: cancelLike ? arrayRemove(id) : arrayUnion(id),
  });

  await updateDoc(storyDocRef, {
    likedUsersIds: cancelLike ? arrayRemove(currentUserId) : arrayUnion(currentUserId),
  });
}

// CATEGORY

export async function getCategories(): Promise<Category[]> {
  const snapshot = await getDocs(categoryColRef);
  return snapshot.docs.map((document) => ({ ...document.data(), id: document.id }));
}

export async function createCategory(
  createCategoryDto: CreateCategoryDto
): Promise<void> {
  await addDoc(categoryColRef, createCategoryDto);
}

export async function findCategory(categoryId: Story['categoryId']): Promise<Category> {
  const categoryDoc = await getDoc(doc(categoryColRef, categoryId));

  if (categoryDoc.exists()) return { ...categoryDoc.data(), id: categoryDoc.id };
  throw new Error('category not found');
}

export async function searchCategories(search?: string): Promise<Category[]> {
  let q = query(categoryColRef);

  if (search) {
    const searchLower = search?.toLowerCase();
    const searchQuery = query(
      q,
      where('name', '>=', searchLower),
      where('name', '<=', `${searchLower}\uf8ff`)
    );

    q = searchQuery;
  }

  const snapshot = await getDocs(query(q, limit(10)));
  return snapshot.docs.map((document) => ({ ...document.data(), id: document.id }));
}
