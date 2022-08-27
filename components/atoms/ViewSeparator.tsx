import { useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

function ViewSeparator() {
  const { theme } = useTheme();

  return <View style={{ width: theme.spacing.xl }} />;
}

export default ViewSeparator;
