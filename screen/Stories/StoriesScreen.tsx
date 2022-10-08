import { Text } from '@rneui/themed';
import React from 'react';
import { ScrollView } from 'react-native';

import appStyles from '../../theme/appStyles';

function StoriesScreen() {
  return (
    <ScrollView
      contentContainerStyle={[appStyles.containerGutter, appStyles.sectionLarge]}
    >
      <Text h1>Forum</Text>
    </ScrollView>
  );
}

export default StoriesScreen;
