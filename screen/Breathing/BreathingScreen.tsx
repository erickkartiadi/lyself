import { Text } from '@rneui/themed';
import * as React from 'react';
import { View } from 'react-native';

import { BreathingScreenNavigationProps } from '../../navigation/navigation.types';
import useApplyHeaderWorkaround from '../../utils/hooks/useApplyHeaderWorkaround';

function BreathingScreen({ navigation }: BreathingScreenNavigationProps) {
  useApplyHeaderWorkaround(navigation.setOptions);

  return (
    <View>
      <Text h1>This is breathing screen</Text>
    </View>
  );
}

export default BreathingScreen;
