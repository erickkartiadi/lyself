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
import { createCollection, usersColRef } from '../../firebase/firebase';

export type CreateStoryDto = Omit<Story, 'updatedAt' | 'id'>;
export type LikeStoryDto = Pick<Story, 'id'> & {
  currentUserId: User['uid'];
  cancelLike: boolean;
};

export type CreateCategoryDto = Omit<Category, 'id'>;

const storyCol = createCollection<CreateStoryDto>('story');
const categoryCol = createCollection<CreateCategoryDto>('category');

export async function getStories(
  pageParam: Story | null,
  categoryId: string
): Promise<Story[]> {
  if (!pageParam) return [];

  let q = query(storyCol, orderBy('createdAt', 'desc'), limit(10));

  if (categoryId !== 'all') {
    const filteredQuery = query(q, where('categoryId', '==', categoryId));
    q = filteredQuery;
  }

  // first data
  if (pageParam?.id !== null) {
    const currSnapshot = await getDoc(doc(storyCol, pageParam.id));
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
  const newStory = await addDoc(storyCol, createStoryDto);
  await updateDoc(doc(categoryCol, createStoryDto.categoryId), {
    storyIds: arrayUnion(newStory.id),
  });
}

export async function likeStory({
  id,
  currentUserId,
  cancelLike,
}: LikeStoryDto): Promise<void> {
  const userDoc = doc(usersColRef, currentUserId);
  const storyDoc = doc(storyCol, id);

  await updateDoc(userDoc, {
    likedStoryIds: cancelLike ? arrayRemove(id) : arrayUnion(id),
  });

  await updateDoc(storyDoc, {
    likedUsersIds: cancelLike ? arrayRemove(currentUserId) : arrayUnion(currentUserId),
  });
}

// CATEGORY

export async function createCategory(
  createCategoryDto: CreateCategoryDto
): Promise<void> {
  await addDoc(categoryCol, createCategoryDto);
}

export async function findCategory(categoryId: Story['categoryId']): Promise<Category> {
  const categoryDoc = await getDoc(doc(categoryCol, categoryId));

  if (categoryDoc.exists()) return { ...categoryDoc.data(), id: categoryDoc.id };
  throw new Error('category not found');
}

export async function getCategories(): Promise<Category[]> {
  const snapshot = await getDocs(categoryCol);
  return snapshot.docs.map((document) => ({ ...document.data(), id: document.id }));
}

export async function searchCategories(search?: string): Promise<Category[]> {
  let q = query(categoryCol);

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
