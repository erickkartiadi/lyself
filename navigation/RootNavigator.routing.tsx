import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Host } from 'react-native-portalize';

import InDevelopmentScreen from '../screen/Error/InDevelopmentScreen';
import { navThemeDark, navThemeLight } from '../theme';
import { AuthContext } from '../utils/context/AuthContext';
import { ThemeModeContext } from '../utils/context/ThemeModeContext';
import AuthNavigator from './AuthNavigator.routing';
import HomeNavigator from './HomeNavigator.routing';
import { RootStackParamList } from './navigation.types';
import TodoNavigator from './TodoNavigator.routing';

const Stack = createNativeStackNavigator<RootStackParamList>();
const prefix = Linking.createURL('/');

function RootNavigator() {
  const { isDarkMode } = React.useContext(ThemeModeContext);
  const { user } = React.useContext(AuthContext);

  const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [prefix],
    config: {
      screens: {
        TodoStack: 'todo',
        AuthStack: '*',
      },
    },
  };

  return (
    <NavigationContainer
      linking={linking}
      theme={isDarkMode ? navThemeDark : navThemeLight}
    >
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Host>
        <Stack.Navigator
          initialRouteName="HomeTab"
          screenOptions={{
            headerShown: false,
          }}
        >
          {user ? (
            <>
              <Stack.Screen name="HomeTab" component={HomeNavigator} />
              <Stack.Screen name="TodoStack" component={TodoNavigator} />
              <Stack.Screen name="InDevelopment" component={InDevelopmentScreen} />
            </>
          ) : (
            <Stack.Screen name="AuthStack" component={AuthNavigator} />
          )}
        </Stack.Navigator>
      </Host>
    </NavigationContainer>
  );
}

export default RootNavigator;
