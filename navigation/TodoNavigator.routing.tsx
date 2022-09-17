import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import TodoScreen from '../screen/Todo/TodoScreen';
import { TodoStackParamList } from '../types/navigation.types';
import { navigatorScreenOptions } from './HomeNavigator.routing';

const Stack = createNativeStackNavigator<TodoStackParamList>();

function TodoNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Todo"
      screenOptions={{
        ...navigatorScreenOptions,
        headerShown: true,
      }}
    >
      <Stack.Screen name="Todo" component={TodoScreen} />
    </Stack.Navigator>
  );
}

export default TodoNavigator;
