import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ConsultStackParamList } from '../param.types';
import ConsultScreen from '../../screen/Explore/ConsultScreen';
import PsychiatristScreen from '../../screen/Explore/PsychiatristScreen';

const Stack = createNativeStackNavigator<ConsultStackParamList>();

function ConsultNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Consult"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen name="Consult" component={ConsultScreen} />
      <Stack.Screen name="Psychiatrist" component={PsychiatristScreen} />
    </Stack.Navigator>
  );
}

export default ConsultNavigator;
