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
import { createCollection } from '../../firebase/firebase';
import { usersCol } from '../user/users.api';

export type CreateStoryDto = Omit<Story, 'updatedAt' | 'id'>;
export type LikeStoryDto = Pick<Story, 'id'> & {
  currentUserId: User['uid'];
  cancelLike: boolean;
};

export type CreateCategoryDto = Omit<Category, 'id'>;

const storyCol = createCollection<CreateStoryDto>('story');
const categoryCol = createCollection<CreateCategoryDto>('category');

export async function fetchStories(
  pageParam: Story | null,
  categoryId: string
): Promise<Story[]> {
  if (!pageParam) return [];

  let q = query(storyCol, orderBy('createdAt', 'desc'), limit(10));

  if (categoryId !== 'all') {
    const filteredQuery = query(q, where('categoryId', '==', categoryId));
    q = filteredQuery;
  }

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
  const userDoc = doc(usersCol, currentUserId);
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
  throw new Error('Category not found');
}

export async function fetchCategories(): Promise<Category[]> {
  const querySnapshot = await getDocs(categoryCol);
  return querySnapshot.docs.map((document) => ({ ...document.data(), id: document.id }));
}

export async function searchCategories(search?: string): Promise<Category[]> {
  let q = query(categoryCol);

  if (search) {
    const searchLower = search?.toLowerCase();
    q = query(
      categoryCol,
      where('name', '>=', searchLower),
      where('name', '<=', `${searchLower}\uf8ff`)
    );
  }

  const querySnapshot = await getDocs(query(q, limit(10)));

  return querySnapshot.docs.map((document) => ({ ...document.data(), id: document.id }));
}
