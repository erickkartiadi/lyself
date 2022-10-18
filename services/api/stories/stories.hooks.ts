import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import { Category, Story } from '../../../types/types';
import { sortNumber } from '../../../utils/sort';
import { somethingWentWrongToast } from '../../../utils/toast';
import {
  createCategory,
  createStory,
  findCategory,
  getCategories,
  getStories,
  likeStory,
  searchCategories,
} from './stories.api';

// export const useGetStories = (categoryId: string) =>
//   useQuery<Story[]>(['story', categoryId], () => fetchStories(categoryId));

export const useGetStories = (categoryId: string) =>
  useInfiniteQuery(
    ['story', categoryId],
    ({ pageParam = { id: null } }) => getStories(pageParam, categoryId),
    {
      getNextPageParam: (lastPage) => lastPage[lastPage.length - 1] ?? null,
      staleTime: 120000,
      refetchInterval: 120000,
    }
  );

export const useCreateStory = () =>
  useMutation(createStory, {
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Your story has been created',
      });
    },
    onError: () => {
      somethingWentWrongToast();
    },
  });

export const useLikeStory = () => useMutation(likeStory);

// CATEGORIES
export const useGetCategories = () =>
  useInfiniteQuery<Category[]>(['category'], getCategories, {
    select: (data) => {
      console.log(data);
      return data;
    },
    // data.sort((a, b) => sortNumber(a.storyIds.length, b.storyIds.length, 'DESC')),
  });

export const useSearchCategories = (search?: string) =>
  useQuery<Category[]>(['category', search], () => searchCategories(search), {
    select: (data) =>
      data.sort((a, b) => sortNumber(a.storyIds.length, b.storyIds.length, 'DESC')),
    refetchInterval: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 15,
    enabled: Boolean(search),
  });

export const useFindCategory = (categoryId: Story['categoryId']) =>
  useQuery<Category>(['category', categoryId], () => findCategory(categoryId), {
    refetchInterval: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 15,
  });

export const useCreateCategory = () =>
  useMutation(createCategory, {
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Category created',
        text2: 'You can select the category when you add new story',
      });
    },
    onError: () => {
      somethingWentWrongToast();
    },
  });
