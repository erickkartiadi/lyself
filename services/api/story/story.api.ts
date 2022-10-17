import {
  addDoc,
  arrayUnion,
  doc,
  documentId,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import { Category, Story } from '../../../types/types';
import { createCollection } from '../../firebase/firebase';

export type CreateStoryDto = Omit<Story, 'updatedAt' | 'id'>;
export type UpdateTodoDto = Story;
export type CreateCategoryDto = Omit<Category, 'id'>;
export type UpdateCategoryDto = Omit<Category, 'id' | 'label'>;

const storyCol = createCollection<CreateStoryDto>('story');
const categoryCol = createCollection<CreateCategoryDto>('category');

export async function fetchStories(categoryId: string): Promise<Story[]> {
  let snapshot;

  if (categoryId !== 'all') {
    const categorySnapshot = await getDoc(doc(categoryCol, categoryId));
    const storyIds = categorySnapshot.data()?.storyIds;

    if (storyIds && storyIds?.length <= 0) {
      return [];
    }

    const q = query(storyCol, where(documentId(), 'in', storyIds));
    snapshot = await getDocs(q);
  } else {
    snapshot = await getDocs(storyCol);
  }

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

export async function updateStory(CreateStoryDto: CreateStoryDto) {
  return 'tes';
}

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
