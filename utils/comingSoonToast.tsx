import { ToastAndroid } from 'react-native';

export const showToast = (msg: string) => {
  ToastAndroid.showWithGravityAndOffset(
    msg,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    25,
    50
  );
};

export const comingSoonToast = () => showToast('Coming Soon! 🚀');
