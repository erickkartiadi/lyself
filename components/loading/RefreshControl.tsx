import { useTheme } from '@rneui/themed';
import React from 'react';
import { RefreshControl as RNRefreshControl, RefreshControlProps } from 'react-native';

function RefreshControl(props: RefreshControlProps) {
  const { theme } = useTheme();

  return (
    <RNRefreshControl
      {...props}
      progressBackgroundColor={theme.colors.cardBackground}
      colors={[theme.colors.primary]}
    />
  );
}

export default RefreshControl;
