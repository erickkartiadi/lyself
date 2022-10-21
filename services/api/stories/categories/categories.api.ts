import {
  addDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';

import { Category, Story } from '../../../../types/types';
import { categoryColRef } from '../../../firebase/firebase';

export type CreateCategoryDto = Omit<Category, 'id'>;
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
