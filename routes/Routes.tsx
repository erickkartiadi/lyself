import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@rneui/themed';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  ChatTabBarIcon,
  ExploreTabBarIcon,
  HomeTabBarIcon,
  UserTabBarIcon,
} from '../components/BottomTabBarIcons';
import LeftHeaderComponent from '../components/header/LeftHeaderComponent';
import RightHeaderComponent from '../components/header/RightHeaderComponent';
import HomePage from '../screen/HomePage';
import ChatRoutes from './Chat.routes';
import ExploreRoutes from './Explore.routes';
import { RootStackParamList } from './types';
import AccountRoutes from './Account.routes';
import { ThemeModeContext } from '../theme/ThemeModeContext';

const Tab = createBottomTabNavigator<RootStackParamList>();

function Routes() {
  const { theme } = useTheme();
  const { isDarkMode } = React.useContext(ThemeModeContext);

  return (
    <>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarShowLabel: false,
          headerRight: RightHeaderComponent,
          headerStyle: { height: 100 },
          headerTitleContainerStyle: { marginStart: 0 },
          headerTitleStyle: {
            fontFamily: 'OpenSans-Semibold',
            fontWeight: '600',
          },
          headerLeftContainerStyle: { marginStart: theme.spacing.lg },
          headerRightContainerStyle: { marginEnd: theme.spacing.lg },
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
          name="ExploreRoutes"
          component={ExploreRoutes}
          options={{ tabBarIcon: ExploreTabBarIcon, title: 'Explore' }}
        />
        <Tab.Screen
          name="ChatRoutes"
          component={ChatRoutes}
          options={{ tabBarIcon: ChatTabBarIcon, title: 'Chat' }}
        />
        <Tab.Screen
          name="AccountRoutes"
          component={AccountRoutes}
          options={{ tabBarIcon: UserTabBarIcon, title: 'Account' }}
        />
      </Tab.Navigator>
    </>
  );
}

export default Routes;
