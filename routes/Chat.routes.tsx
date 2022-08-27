import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../screen/Chat/ChatScreen';
import { ChatRouteParamList } from '../types/routes';

const Stack = createNativeStackNavigator<ChatRouteParamList>();

function ChatRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Chat"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

export default ChatRoutes;
