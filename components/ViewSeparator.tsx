import { themeSpacing } from '@rneui/themed/dist/config/ThemeProvider';
import React from 'react';
import { View } from 'react-native';

function ViewSeparator() {
  return <View style={{ width: themeSpacing.lg }} />;
}

export default ViewSeparator;
