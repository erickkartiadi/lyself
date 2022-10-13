import { Colors } from '@rneui/themed';

const IMPORTANCE_COLORS: { [key: string]: keyof Colors } = {
  high: 'error',
  medium: 'warning',
  low: 'blue',
  none: 'grey3',
};

export default IMPORTANCE_COLORS;
