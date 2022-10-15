import {
  addDoc,
  arrayUnion,
  doc,
  documentId,
  getDoc,
  getDocs,
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

export async function fetchStories(selectedCategory: string): Promise<Story[]> {
  if (selectedCategory !== 'all') {
    const categorySnapshot = await getDoc(doc(categoryCol, selectedCategory));

    const storyIds = categorySnapshot.data()?.storyIds;

    const q = query(storyCol, where(documentId(), 'in', storyIds));

    const categoryStorySnap = await getDocs(q);

    return categoryStorySnap.docs.map((document) => ({
      ...document.data(),
      id: document.id,
    })) as Story[];
  }

  const querySnapshot = await getDocs(storyCol);
  return querySnapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  })) as Story[];
}

export async function fetchCategories(): Promise<Category[]> {
  const querySnapshot = await getDocs(categoryCol);
  return querySnapshot.docs.map((document) => ({ ...document.data(), id: document.id }));
}

export async function findCategory(categoryId: string): Promise<Category> {
  const categoryDoc = await getDoc(doc(categoryCol, categoryId));

  return categoryDoc.data() as Category;
}
// TODO add user id
export async function createStory(createStoryDto: CreateStoryDto): Promise<void> {
  const newStory = await addDoc(storyCol, createStoryDto);
  await updateDoc(doc(categoryCol, createStoryDto.categoryId), {
    storyIds: arrayUnion(newStory.id),
  });
}

export async function updateStory(CreateStoryDto: CreateStoryDto) {
  return 'tes';
}
