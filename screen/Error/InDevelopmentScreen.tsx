import { useNavigation } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import * as React from 'react';
import { View } from 'react-native';

import layout from '../../styles/layout';
import { text } from '../../styles/typhography';

function InDevelopmentScreen() {
  const navigation = useNavigation();

  return (
    <View style={[layout.container, layout.align_center, layout.justify_center]}>
      <Text h4 style={text.center}>
        Sorry, this page is still in development 🚧
      </Text>
      <Button onPress={navigation.goBack} type="clear" title="Go back" />
    </View>
  );
}

export default InDevelopmentScreen;
