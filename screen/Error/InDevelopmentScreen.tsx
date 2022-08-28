import * as React from 'react';
import { Button, Text } from '@rneui/themed';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
      <Button
        onPress={() => navigation.goBack()}
        type="clear"
        title="Go back to explore page"
      />
    </View>
  );
}

export default InDevelopmentScreen;
