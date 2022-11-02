import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import BreathingScreen from '../screen/Breathing/BreathingScreen';
import { navigatorScreenOptions } from './HomeNavigator.routing';
import { BreathingStackParamList } from './navigation.types';

const Stack = createNativeStackNavigator<BreathingStackParamList>();

function BreathingNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Breathing"
      screenOptions={{
        ...navigatorScreenOptions,
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Breathing"
        component={BreathingScreen}
        options={{ title: 'Breathing' }}
      />
    </Stack.Navigator>
  );
}

export default BreathingNavigator;
