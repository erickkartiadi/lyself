import { Text } from '@rneui/themed';
import React from 'react';
import { ScrollView } from 'react-native';

import appStyles from '../theme/appStyles';

function NotificationScreen() {
  return (
    <ScrollView
      contentContainerStyle={[appStyles.containerGutter, appStyles.sectionLarge]}
    >
      <Text h1>Notification</Text>
    </ScrollView>
  );
}

export default NotificationScreen;
