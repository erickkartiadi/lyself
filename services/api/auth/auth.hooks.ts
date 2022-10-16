import { useMutation } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import Toast from 'react-native-toast-message';

import { somethingWentWrongToast } from '../../../utils/toast';
import { forgotPassword, login, register } from './auth.api';

export const useLogin = () =>
  useMutation(login, {
    onError: (error: FirebaseError) => {
      Toast.show({
        type: 'error',
        text1: error.name,
        text2: error.message,
      });
    },
  });

export const useForgotPassword = () =>
  useMutation(forgotPassword, {
    onSuccess: (email) => {
      Toast.show({
        type: 'success',
        text1: 'Email sent',
        text2: `We have sent you a reset password email to ${email}. Please check your inbox.`,
        visibilityTime: 10000,
      });
    },
    onError: () => {
      somethingWentWrongToast();
    },
  });

export const useRegister = () =>
  useMutation(register, {
    onSuccess: ({ user: { email } }) => {
      Toast.show({
        type: 'success',
        text1: 'Email confirmation sent',
        text2: `We have sent you a confirmation email to ${email}, please confirm your email address.`,
      });
    },
    onError: (error: FirebaseError) => {
      Toast.show({
        type: 'error',
        text1: error.name,
        text2: error.message,
      });
    },
  });
