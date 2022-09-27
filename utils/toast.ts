import Toast from 'react-native-toast-message';

export const comingSoonToast = () =>
  Toast.show({
    type: 'info',
    text1: 'Coming soon 🚀',
    text2: 'Something really cool is coming.',
  });

export const somethingWentWrongToast = () =>
  Toast.show({
    type: 'error',
    text1: 'Something went wrong',
    text2: 'Please try again later',
  });
