import { useNavigation } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import * as React from 'react';
import { View } from 'react-native';

import appStyles from '../../theme/appStyles';

function InDevelopmentScreen() {
  const navigation = useNavigation();

  return (
    <View style={[appStyles.container, appStyles.alignCenter, appStyles.justifyCenter]}>
      <Text h4 style={{ textAlign: 'center' }}>
        Sorry, this page is still in development 🚧
      </Text>
      <Button onPress={navigation.goBack} type="clear" title="Go back" />
    </View>
  );
}

export default InDevelopmentScreen;
