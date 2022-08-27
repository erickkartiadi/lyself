import * as React from 'react';
import { Button, Text } from '@rneui/themed';
import { View } from 'react-native';
import { styles } from '../../theme/styles';
import { ExploreScreenProps } from '../Explore/ExploreScreen';

function InDevelopmentScreen({ navigation }: ExploreScreenProps) {
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
        onPress={() => navigation.navigate('Explore')}
        type="clear"
        title="Go back to explore page"
      />
    </View>
  );
}

export default InDevelopmentScreen;
