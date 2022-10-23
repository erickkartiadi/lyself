import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import { User } from '../../../types/types';
import { changeProfile, findUser, removeProfile } from './users.api';

export const useFindUser = (uid: User['uid'] | undefined) =>
  useQuery<User | undefined>(['user', uid], () => findUser(uid));

export const useChangeProfile = () => {
  const queryClient = useQueryClient();
  return useMutation(changeProfile, {
    onSuccess: (uid) => {
      queryClient.invalidateQueries(['user', uid]);
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Upload failed :(',
        text2:
          'Sorry, we cannot change your profile at the moment, please try again later.',
      });
    },
  });
};

export const useRemoveProfile = () => {
  const queryClient = useQueryClient();
  return useMutation(removeProfile, {
    onSuccess: (uid) => {
      queryClient.invalidateQueries(['user', uid]);
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Remove profile failed',
        text2: 'Please try again later',
      });
    },
  });
};
