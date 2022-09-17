import { Text } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { styles } from '../../theme/styles';

function TodoScreen() {
  return (
    <ScrollView contentContainerStyle={[styles.section]}>
      <View style={styles.section}>
        <Text h1>Hello, world </Text>
      </View>
    </ScrollView>
  );
}

export default TodoScreen;
