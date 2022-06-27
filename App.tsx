import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import NavigationContainer from './components/NavigationContainer';
import UserPage from './screen/UserPage';
import HomePage from './screen/HomePage';
import { myTheme } from './theme';
import ExplorePage from './screen/ExplorePage';
import ChatPage from './screen/ChatPage';
import { PreferencesProvider } from './theme/PreferencesContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <SafeAreaProvider>
        <PreferencesProvider>
          <NavigationContainer>
            <Tab.Navigator initialRouteName="Home">
              <Tab.Screen name="Home" component={HomePage} />
              <Tab.Screen name="Explore" component={ExplorePage} />
              <Tab.Screen name="Chat" component={ChatPage} />
              <Tab.Screen name="User" component={UserPage} />
            </Tab.Navigator>
          </NavigationContainer>
        </PreferencesProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
