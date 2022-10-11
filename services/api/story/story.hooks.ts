import { useMutation, useQuery } from '@tanstack/react-query';

import { Story } from '../../../types/types';
import { createStory, fetchStories, updateStory } from './story.api';

export const useGetStories = () =>
  useQuery<Story[]>(['story'], fetchStories, { refetchInterval: 1000 * 60 });

// add newly created story to cache
export const useCreateStory = () => useMutation(createStory);
export const useUpdateStory = () => useMutation(updateStory);
