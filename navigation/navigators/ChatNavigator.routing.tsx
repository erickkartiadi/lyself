import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../../screen/Chat/ChatScreen';
import { ChatStackParamList } from '../../types/param';

const Stack = createNativeStackNavigator<ChatStackParamList>();

function ChatNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Chat"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

export default ChatNavigator;
