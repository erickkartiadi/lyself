/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { Platform } from 'react-native';

export default function useApplyHeaderWorkaround(
  setOptions: (options: NativeStackNavigationOptions) => void
) {
  const headerHeight = useHeaderHeight();

  const androidHeaderFix = useMemo(
    () => ({
      headerTransparent: true,
      contentStyle: { paddingTop: headerHeight },
    }),
    [headerHeight]
  );

  React.useLayoutEffect(() => {
    Platform.OS === 'android' && setOptions(androidHeaderFix);
  }, [setOptions, androidHeaderFix]);
}
