/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { Platform } from 'react-native';

// issue: header hide screen after layout animation run
// https://github.com/software-mansion/react-native-reanimated/issues/2906
// temporary fix by add padding
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
