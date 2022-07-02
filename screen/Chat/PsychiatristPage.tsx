import * as React from 'react';
import { Button, Text } from '@rneui/themed';
import { View } from 'react-native';
import { styles } from '../../theme';
import { ChatPageProps } from './ChatPage';

function PsychiatristPage({ navigation }: ChatPageProps) {
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
        Sorry, this page is still in development 👨🏻‍⚕️
      </Text>
      <Button
        onPress={() => navigation.navigate('Chat')}
        type="clear"
        title="Go back to chat page"
      />
    </View>
  );
}

export default PsychiatristPage;
