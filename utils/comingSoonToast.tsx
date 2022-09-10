import Toast from 'react-native-toast-message';

export const showToast = (msg: string) => {
  Toast.show({
    type: 'info',
    text1: msg,
  });
};

export const comingSoonToast = () => showToast('Coming Soon! 🚀');
