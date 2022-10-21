import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import { Category, Story } from '../../../../types/types';
import { somethingWentWrongToast } from '../../../../utils/toast';
import {
  createCategory,
  findCategory,
  getCategories,
  searchCategories,
} from './categories.api';

// CATEGORIES

export const useGetCategories = () =>
  useInfiniteQuery<Category[]>(
    ['category'],
    ({ pageParam = { id: null } }) => getCategories(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage[lastPage.length - 1] ?? null,
    }
  );

export const useSearchCategories = (search?: string) =>
  useQuery<Category[]>(['category', search], () => searchCategories(search), {
    refetchInterval: 1000 * 60 * 15,
    staleTime: 1000 * 60 * 15,
    enabled: Boolean(search),
  });

export const useFindCategory = (categoryId: Story['categoryId']) =>
  useQuery<Category>(['category', categoryId], () => findCategory(categoryId));

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
