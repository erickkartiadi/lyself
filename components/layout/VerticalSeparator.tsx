import { ThemeSpacing, useTheme } from '@rneui/themed';
import * as React from 'react';
import { View } from 'react-native';

interface VerticalSeparatorProps {
  spacing?: keyof ThemeSpacing;
}

function VerticalSeparator({ spacing = 'md' }: VerticalSeparatorProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        marginVertical: theme.spacing[spacing],
      }}
    />
  );
}

VerticalSeparator.defaultProps = {
  spacing: 'md',
};

export default VerticalSeparator;
