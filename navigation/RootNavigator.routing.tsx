import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { AuthContext } from '../context/AuthContext';
import { ThemeModeContext } from '../context/ThemeModeContext';
import InDevelopmentScreen from '../screen/Error/InDevelopmentScreen';
import { navThemeDark, navThemeLight } from '../theme';
import { RootStackParamList } from '../types/navigation.types';
import AuthNavigator from './AuthNavigator.routing';
import ConsultNavigator from './ConsultNavigator.routing';
import HomeNavigator from './HomeNavigator.routing';
import TodoNavigator from './TodoNavigator.routing';

const Stack = createNativeStackNavigator<RootStackParamList>();
const prefix = Linking.createURL('/');

function RootNavigator() {
  const { isDarkMode } = React.useContext(ThemeModeContext);

  const linking = {
    prefixes: [prefix],
  };

  const { userToken } = React.useContext(AuthContext);

  return (
    <NavigationContainer
      linking={linking}
      theme={isDarkMode ? navThemeDark : navThemeLight}
    >
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Stack.Navigator
        initialRouteName="HomeTab"
        screenOptions={{
          headerShown: false,
        }}
      >
        {userToken ? (
          <>
            <Stack.Screen name="HomeTab" component={HomeNavigator} />
            <Stack.Screen name="ConsultStack" component={ConsultNavigator} />
            <Stack.Screen name="TodoStack" component={TodoNavigator} />
            <Stack.Screen name="InDevelopment" component={InDevelopmentScreen} />
          </>
        ) : (
          <Stack.Screen name="AuthStack" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
