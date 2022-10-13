import { Text } from '@rneui/themed';
import React from 'react';
import { ScrollView } from 'react-native';

import layout from '../styles/layout';

function NotificationTabScreen() {
  return (
    <ScrollView contentContainerStyle={[layout.containerGutter, layout.sectionLarge]}>
      <Text h1>Notification</Text>
    </ScrollView>
  );
}

export default NotificationTabScreen;
