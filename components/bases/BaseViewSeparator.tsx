import { ThemeSpacing, useTheme } from '@rneui/themed';
import * as React from 'react';
import { View } from 'react-native';

interface BaseDividerProps {
  spacing?: keyof ThemeSpacing;
  orientation?: 'horizontal' | 'vertical';
}

function BaseViewSeparator({ orientation, spacing = 'md' }: BaseDividerProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        marginHorizontal: orientation === 'horizontal' ? theme.spacing[spacing] : 0,
        marginVertical: orientation === 'vertical' ? theme.spacing[spacing] : 0,
      }}
    />
  );
}

BaseViewSeparator.defaultProps = {
  orientation: 'horizontal',
  spacing: 'md',
};

export default BaseViewSeparator;
