import { useTheme } from '@rneui/themed';
import * as React from 'react';
import { View } from 'react-native';

function BaseDivider() {
  const { theme } = useTheme();

  return <View style={{ width: theme.spacing.xl }} />;
}

export default BaseDivider;
