import { ThemeSpacing, useTheme } from '@rneui/themed';
import * as React from 'react';
import { View } from 'react-native';

interface HorizontalSeparatorProps {
  spacing?: keyof ThemeSpacing;
}

function HorizontalSeparator({ spacing = 'md' }: HorizontalSeparatorProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        marginHorizontal: theme.spacing[spacing],
      }}
    />
  );
}

HorizontalSeparator.defaultProps = {
  spacing: 'md',
};

export default HorizontalSeparator;
