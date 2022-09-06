import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import InDevelopmentScreen from '../screen/Error/InDevelopmentScreen';
import { ThemeModeContext } from '../theme/ThemeModeContext';
import { RootStackParamList } from '../types/navigation.types';
import AuthNavigator from './AuthNavigator.routing';
import ConsultNavigator from './ConsultNavigator.routing';
import HomeNavigator from './HomeNavigator.routing';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { isDarkMode } = React.useContext(ThemeModeContext);

  return (
    <>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Stack.Navigator
        initialRouteName="HomeTab"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="AuthStack" component={AuthNavigator} />
        <Stack.Screen name="HomeTab" component={HomeNavigator} />
        <Stack.Screen name="ConsultStack" component={ConsultNavigator} />
        <Stack.Screen name="InDevelopment" component={InDevelopmentScreen} />
      </Stack.Navigator>
    </>
  );
}

export default RootNavigator;
