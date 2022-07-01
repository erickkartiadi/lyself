import * as React from 'react';
import { Button, Text } from '@rneui/themed';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styles from '../../theme/styles';
import { ExplorePageProps } from '../Explore/ExplorePage';

function Progress({ navigation }: ExplorePageProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.containerSection,
      }}
    >
      <Text h4 style={{ textAlign: 'center' }}>
        Sorry, this page is still in development 🚀
      </Text>
      <Button
        onPress={() => navigation.navigate('Explore')}
        type="clear"
        title="Go back to explore page"
      />
    </View>
  );
}

export default Progress;
