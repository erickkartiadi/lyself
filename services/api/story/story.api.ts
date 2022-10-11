import { addDoc, getDocs } from 'firebase/firestore';

import { Story } from '../../../types/types';
import { createCollection } from '../../firebase/firebase';

type CreateStoryDto = Omit<Story, 'updatedAt'>;
type UpdateTodoDto = Story;

const storyCol = createCollection<Story>('story');

export async function fetchStories(): Promise<Story[]> {
  const querySnapshot = await getDocs(storyCol);

  return querySnapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  }));
}

export async function createStory(createStoryDto: CreateStoryDto): Promise<void> {
  await addDoc(storyCol, createStoryDto);
}

export async function updateStory(CreateStoryDto: CreateStoryDto) {
  return 'tes';
}
