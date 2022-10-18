import { useTheme } from '@rneui/themed';
import * as React from 'react';
import {
  ActivityIndicator as RNActivityIndicator,
  ActivityIndicatorProps,
} from 'react-native';

function ActivityIndicator({ ...props }: ActivityIndicatorProps) {
  const { theme } = useTheme();

  return <RNActivityIndicator color={theme.colors.primary} {...props} />;
}

export default ActivityIndicator;
