import {
  addDoc,
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  getDocs,
  increment,
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

export async function getCategories(pageParam: Category | null): Promise<Category[]> {
  if (!pageParam) return [];

  // initial data
  let q = query(categoryColRef, orderBy('storyCount', 'desc'), limit(5));

  if (pageParam?.id !== null) {
    const categoryDocRef = doc(categoryColRef, pageParam.id);
    const currSnapshot = await getDoc(categoryDocRef);
    q = query(q, startAfter(currSnapshot));
  }

  const snapshot = await getDocs(q);
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
      orderBy('name'),
      where('name', '>=', searchLower),
      where('name', '<=', `${searchLower}\uf8ff`)
    );

    q = searchQuery;
  }

  q = query(q, orderBy('storyCount', 'desc'), limit(10));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((document) => ({ ...document.data(), id: document.id }));
}
