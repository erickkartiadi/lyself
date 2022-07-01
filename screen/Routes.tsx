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
import ChatPage from './ChatPage';
import ExploreRoutes from './Explore/Explore.routes';
import HomePage from './HomePage';
import UserPage from './UserPage';

export type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
  User: undefined;
  ExploreRoutes: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

function Routes() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="ExploreRoutes"
      screenOptions={{
        tabBarShowLabel: false,
        headerRight: RightHeaderComponent,
        headerStyle: { height: 100 },
        headerTitleContainerStyle: { marginStart: 0 },
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
  );
}

export default Routes;
