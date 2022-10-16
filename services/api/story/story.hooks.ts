import { useMutation, useQuery } from '@tanstack/react-query';

import { Category, Story } from '../../../types/types';
import {
  createStory,
  fetchCategories,
  fetchStories,
  findCategory,
  updateStory,
} from './story.api';

export const useGetStories = (categoryId: string) =>
  useQuery<Story[]>(['story', categoryId], () => fetchStories(categoryId), {
    refetchInterval: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 15,
  });

export const useGetCategories = () => useQuery<Category[]>(['category'], fetchCategories);

// add newly created story to cache
export const useCreateStory = () => useMutation(createStory);
export const useUpdateStory = () => useMutation(updateStory);

// TODO use Category id type
export const useFindCategory = (categoryId: string) =>
  useQuery<Category>(['category', categoryId], () => findCategory(categoryId), {
    refetchInterval: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 15,
  });
