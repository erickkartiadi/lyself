import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import { Story } from '../../../../types/types';
import {
  createReply,
  deleteReply,
  findReplyCount,
  getReplies,
  updateReply,
} from './replies.api';

export const useCreateReply = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(createReply, {
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Your reply added to this story',
      });

      queryClient.invalidateQueries(['reply', id]);
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Sorry, we cannot add your reply.',
        text2: 'Please try again later',
      });
    },
  });
};

export const useUpdateReply = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(updateReply, {
    onSuccess: () => {
      queryClient.invalidateQueries(['reply', id]);
    },
  });
};

export const useDeleteReply = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(deleteReply, {
    onSuccess: () => {
      queryClient.invalidateQueries(['reply', id]);
    },
  });
};

export const useGetReplies = (storyId: Story['id']) =>
  useQuery(['reply', storyId], () => getReplies(storyId), {
    staleTime: 120000,
  });

export const useFindReplyCount = (storyId: Story['id']) =>
  useQuery(['replyCount', storyId], () => findReplyCount(storyId));
