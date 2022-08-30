import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTheme } from '@rneui/themed';
import { ConsultStackParamList } from '../param.types';
import ConsultScreen from '../../screen/Consult/ConsultScreen';
import PsychiatristScreen from '../../screen/Consult/PsychiatristScreen';
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
    </Stack.Navigator>
  );
}

export default ConsultNavigator;