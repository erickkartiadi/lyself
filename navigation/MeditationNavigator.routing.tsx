import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import MeditationScreen from '../screen/Meditation/MeditationScreen';
import { navigatorScreenOptions } from './HomeNavigator.routing';
import { MeditationStackParamList } from './navigation.types';

const Stack = createNativeStackNavigator<MeditationStackParamList>();

function MeditationNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Meditation"
      screenOptions={{
        ...navigatorScreenOptions,
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Meditation"
        component={MeditationScreen}
        options={{ title: 'Meditation' }}
      />
    </Stack.Navigator>
  );
}

export default MeditationNavigator;
