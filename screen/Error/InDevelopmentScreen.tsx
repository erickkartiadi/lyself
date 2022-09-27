import { useNavigation } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import * as React from 'react';
import { View } from 'react-native';

import { styles } from '../../theme/styles';

function InDevelopmentScreen() {
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.container,
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <Text h4 style={{ textAlign: 'center' }}>
        Sorry, this page is still in development 🚧
      </Text>
      <Button onPress={navigation.goBack} type="clear" title="Go back" />
    </View>
  );
}

export default InDevelopmentScreen;
