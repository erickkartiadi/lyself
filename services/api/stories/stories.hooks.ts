import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import { User, UserStoryType } from '../../../types/types';
import { somethingWentWrongToast } from '../../../utils/toast';
import { createStory, getStories, getUserStories, saveStory } from './stories.api';

export const useGetStories = (categoryId: string) =>
  useInfiniteQuery(
    ['story', categoryId],
    ({ pageParam = { id: null } }) => getStories(pageParam, categoryId),
    {
      getNextPageParam: (lastPage) => lastPage[lastPage.length - 1] ?? null,
      staleTime: 120000,
    }
  );

export const useGetUserStories = (userId: User['uid'] | undefined, type: UserStoryType) =>
  useInfiniteQuery(
    ['story', type, userId],
    ({ pageParam = { id: null } }) => getUserStories(pageParam, userId, type),
    {
      getNextPageParam: (lastPage) => lastPage[lastPage.length - 1] ?? null,
      staleTime: 120000,
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

export const useSaveStory = () => {
  const queryClient = useQueryClient();

  return useMutation(saveStory, {
    onSettled: () => {
      queryClient.invalidateQueries(['user']);
    },
  });
};
