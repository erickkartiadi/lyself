import { ToastConfig } from 'react-native-toast-message';

import { ErrorToast, InfoToast, SuccessToast } from '../components/base/Toast';

const toastConfig: ToastConfig = {
  success: SuccessToast,
  error: ErrorToast,
  info: InfoToast,
};

export default toastConfig;
