import { Text } from '@rneui/themed';
import * as React from 'react';
import { View } from 'react-native';

import { MeditationScreenNavigationProps } from '../../navigation/navigation.types';
import useApplyHeaderWorkaround from '../../utils/hooks/useApplyHeaderWorkaround';

function MeditationScreen({ navigation }: MeditationScreenNavigationProps) {
  useApplyHeaderWorkaround(navigation.setOptions);
  return (
    <View>
      <Text h1>This is meditation screen</Text>
    </View>
  );
}

export default MeditationScreen;
