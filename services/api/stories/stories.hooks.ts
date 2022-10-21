import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import { somethingWentWrongToast } from '../../../utils/toast';
import { createStory, getStories } from './stories.api';

export const useGetStories = (categoryId: string) =>
  useInfiniteQuery(
    ['story', categoryId],
    ({ pageParam = { id: null } }) => getStories(pageParam, categoryId),
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
