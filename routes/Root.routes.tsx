import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AuthRoutes from './Auth.routes';
import HomeRoutes from './Home.routes';
import { RootRouteParamList } from '../types/routes';
import { ThemeModeContext } from '../theme/ThemeModeContext';

const Stack = createNativeStackNavigator<RootRouteParamList>();

function RootRoutes() {
  const { isDarkMode } = React.useContext(ThemeModeContext);

  return (
    <>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Stack.Navigator
        initialRouteName="HomeRoutes"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AuthRoutes" component={AuthRoutes} />
        <Stack.Screen name="HomeRoutes" component={HomeRoutes} />
      </Stack.Navigator>
    </>
  );
}

export default RootRoutes;
