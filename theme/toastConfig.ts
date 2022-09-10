import { ToastConfig } from 'react-native-toast-message';

import { ErrorToast, InfoToast, SuccessToast } from '../components/bases/BaseToast';

const toastConfig: ToastConfig = {
  success: SuccessToast,
  error: ErrorToast,
  info: InfoToast,
};

export default toastConfig;
