import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AuthNavigator from './AuthNavigator.routing';
import HomeNavigator from './HomeNavigator.routing';
import { RootStackParamList } from '../../types/param';
import { ThemeModeContext } from '../../theme/ThemeModeContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { isDarkMode } = React.useContext(ThemeModeContext);

  return (
    <>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Stack.Navigator
        initialRouteName="HomeTab"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AuthStack" component={AuthNavigator} />
        <Stack.Screen name="HomeTab" component={HomeNavigator} />
      </Stack.Navigator>
    </>
  );
}

export default RootNavigator;
