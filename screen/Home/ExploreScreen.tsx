import { Text } from '@rneui/themed';
import React from 'react';
import { ScrollView } from 'react-native';

import { styles } from '../../theme/styles';

function ExploreScreen() {
  return (
    <ScrollView contentContainerStyle={[styles.containerGutter, styles.sectionLarge]}>
      <Text h1>Forum</Text>
    </ScrollView>
  );
}

export default ExploreScreen;
