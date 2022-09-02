import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@rneui/themed';
import React from 'react';

import AppointmentScreen from '../../screen/Consult/AppointmentScreen';
import ConsultScreen from '../../screen/Consult/ConsultScreen';
import PsychiatristScreen from '../../screen/Consult/PsychiatristScreen';
import { ConsultStackParamList } from '../../types/navigation.types';
import { navigatorScreenOptions } from './HomeNavigator.routing';

const Stack = createNativeStackNavigator<ConsultStackParamList>();

function ConsultNavigator() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Consult"
      screenOptions={{
        ...navigatorScreenOptions,
        headerStyle: { backgroundColor: theme.colors.background },
        headerShown: true,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="Consult" component={ConsultScreen} />
      <Stack.Screen
        name="Psychiatrist"
        component={PsychiatristScreen}
        options={{ headerTitle: '' }}
      />
      <Stack.Screen
        name="Appointment"
        component={AppointmentScreen}
        options={{ headerTitle: 'My Appointment' }}
      />
    </Stack.Navigator>
  );
}

export default ConsultNavigator;
