import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Reply, Story } from '../../../../types/types';
import { findUpvote, upvote } from './upvotes.api';

export const useUpvote = () => {
  const queryClient = useQueryClient();

  return useMutation(upvote, {
    onSettled: (id) => {
      queryClient.invalidateQueries(['upvote', id]);
    },
  });
};

export const useFindUpvote = (id: Story['id'] | Reply['id']) =>
  useQuery(['upvote', id], () => findUpvote(id));
