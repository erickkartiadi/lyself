import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@rneui/themed';
import * as React from 'react';
import {
  ChatTabBarIcon,
  ExploreTabBarIcon,
  HomeTabBarIcon,
  UserTabBarIcon,
} from '../components/BottomTabBarIcons';
import LeftHeaderComponent from '../components/header/LeftHeaderComponent';
import RightHeaderComponent from '../components/header/RightHeaderComponent';
import Home from '../screen/Home/Home';
import ChatRoutes from './Chat.routes';
import ExploreRoutes from './Explore.routes';
import { HomeRouteParamList } from '../types/routes';
import AccountRoutes from './Account.routes';

const Tab = createBottomTabNavigator<HomeRouteParamList>();

function HomeRoutes() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        headerRight: RightHeaderComponent,
        headerStyle: { height: 95 },
        headerTitleContainerStyle: { marginStart: 0 },
        headerTitleStyle: {
          fontFamily: 'Quicksand-Bold',
          fontWeight: '700',
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
        component={Home}
      />
      <Tab.Screen
        name="ExploreRoutes"
        component={ExploreRoutes}
        options={{
          tabBarIcon: ExploreTabBarIcon,
          title: 'Explore',
        }}
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
  );
}

export default HomeRoutes;
