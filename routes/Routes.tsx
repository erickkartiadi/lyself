import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@rneui/themed';
import * as React from 'react';
import {
  ChatTabBarIcon,
  ExploreTabBarIcon,
  HomeTabBarIcon,
  UserTabBarIcon,
} from '../components/BottomTabBarIcons';
import LeftHeaderComponent from '../components/LeftHeaderComponent';
import RightHeaderComponent from '../components/RightHeaderComponent';
import HomePage from '../screen/HomePage';
import UserPage from '../screen/UserPage';
import ChatRoutes from './Chat.routes';
import ExploreRoutes from './Explore.routes';
import { RootStackParamList } from './types';

const Tab = createBottomTabNavigator<RootStackParamList>();

function Routes() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        headerRight: RightHeaderComponent,
        headerStyle: { height: 100 },
        headerTitleContainerStyle: { marginStart: 0 },
        headerLeftContainerStyle: { marginStart: theme.spacing.lg },
        headerTitleStyle: {
          fontWeight: '800',
          fontFamily: 'Inter-ExtraBold',
        },
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
        name="User"
        component={UserPage}
        options={{ tabBarIcon: UserTabBarIcon, title: 'Account' }}
      />
    </Tab.Navigator>
  );
}

export default Routes;
