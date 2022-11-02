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
import AccountNavigator from './AccountNavigator.routing';
import AuthNavigator from './AuthNavigator.routing';
import BreathingNavigator from './BreathingNavigator.routing';
import HomeNavigator from './HomeNavigator.routing';
import MeditationNavigator from './MeditationNavigator.routing';
import { RootStackParamList } from './navigation.types';
import StoryNavigator from './StoryNavigator.routing';

const Stack = createNativeStackNavigator<RootStackParamList>();
const prefix = Linking.createURL('/');

function RootNavigator() {
  const { isDarkMode } = React.useContext(ThemeModeContext);
  const { user } = React.useContext(AuthContext);

  const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [prefix],
    config: {
      screens: {
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
              <Stack.Screen name="StoryStack" component={StoryNavigator} />
              <Stack.Screen name="MeditationStack" component={MeditationNavigator} />
              <Stack.Screen name="BreathingStack" component={BreathingNavigator} />
              <Stack.Screen name="AccountStack" component={AccountNavigator} />
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
