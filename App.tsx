import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useCallback, useEffect, useState } from 'react';
import { themeSpacing } from '@rneui/themed/dist/config/ThemeProvider';
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import NavigationContainer from './components/NavigationContainer';
import UserPage from './screen/UserPage';
import HomePage from './screen/HomePage';
import { myTheme } from './theme';
import ExplorePage from './screen/ExplorePage';
import ChatPage from './screen/ChatPage';
import { PreferencesProvider } from './theme/PreferencesContext';
import {
  ChatTabBarIcon,
  ExploreTabBarIcon,
  HomeTabBarIcon,
  UserTabBarIcon,
} from './components/BottomTabBarIcons';
import RightHeaderComponent from './components/RightHeaderComponent';
import LeftHeaderComponent from './components/LeftHeaderComponent';

const Tab = createBottomTabNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          'Inter-Light': Inter_300Light,
          Inter: Inter_400Regular,
          'Inter-Medium': Inter_500Medium,
          'Inter-Bold': Inter_700Bold,
        });
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme={myTheme}>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <PreferencesProvider>
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={{
                tabBarShowLabel: false,
                headerRight: RightHeaderComponent,
                headerStyle: { height: 100 },
                headerTitleContainerStyle: { marginStart: 0 },
                headerLeftContainerStyle: { marginStart: themeSpacing.lg },
                headerRightContainerStyle: { marginEnd: themeSpacing.lg },
              }}
            >
              <Tab.Screen
                options={{
                  headerTitleStyle: { display: 'none' },
                  headerLeft: LeftHeaderComponent,
                  tabBarIcon: HomeTabBarIcon,
                }}
                name="Home"
                component={HomePage}
              />
              <Tab.Screen
                name="Explore"
                component={ExplorePage}
                options={{ tabBarIcon: ExploreTabBarIcon }}
              />
              <Tab.Screen
                name="Chat"
                component={ChatPage}
                options={{ tabBarIcon: ChatTabBarIcon }}
              />
              <Tab.Screen
                name="User"
                component={UserPage}
                options={{ tabBarIcon: UserTabBarIcon }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </PreferencesProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
