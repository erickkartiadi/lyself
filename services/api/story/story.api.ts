import { addDoc } from 'firebase/firestore';

import { Story } from '../../../types/types';
import { createCollection } from '../../firebase/firebase';

type CreateStoryDto = Omit<Story, 'updatedAt'>;
type UpdateTodoDto = Story;

export async function createStory(createStoryDto: CreateStoryDto): Promise<void> {
  const storyCol = createCollection('story');
  await addDoc(storyCol, createStoryDto);
}

export async function updateStory(CreateStoryDto: CreateStoryDto) {
  return 'tes';
}
