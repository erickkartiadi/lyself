import { Text } from '@rneui/themed';
import * as React from 'react';
import { View } from 'react-native';

import { SettingScreenNavigationProps } from '../../navigation/navigation.types';
import useApplyHeaderWorkaround from '../../utils/hooks/useApplyHeaderWorkaround';

function SettingScreen({ navigation }: SettingScreenNavigationProps) {
  useApplyHeaderWorkaround(navigation.setOptions);
  return (
    <View>
      <Text h1>This is setting screen</Text>
    </View>
  );
}

export default SettingScreen;
