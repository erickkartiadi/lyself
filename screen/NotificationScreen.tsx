import { Text } from '@rneui/themed';
import React from 'react';
import { ScrollView } from 'react-native';

import { styles } from '../theme/styles';

function NotificationScreen() {
  return (
    <ScrollView contentContainerStyle={[styles.containerGutter, styles.sectionLarge]}>
      <Text h1>Notification</Text>
    </ScrollView>
  );
}

export default NotificationScreen;
