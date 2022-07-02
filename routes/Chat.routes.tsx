import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatPage from '../screen/Chat/ChatPage';
import PsychiatristPage from '../screen/Chat/PsychiatristPage';
import { ChatRouteParamList } from './types';

const Stack = createNativeStackNavigator<ChatRouteParamList>();

function ChatRoutes() {
  return (
    <Stack.Navigator initialRouteName="Chat">
      <Stack.Screen
        name="Chat"
        component={ChatPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Psychiatrist"
        component={PsychiatristPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default ChatRoutes;
