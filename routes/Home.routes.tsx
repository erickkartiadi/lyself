import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useTheme } from '@rneui/themed';
import {
  ChatTabBarIcon,
  ExploreTabBarIcon,
  HomeTabBarIcon,
  UserTabBarIcon,
} from '../components/BottomTabBarIcons';
import LeftHeaderComponent from '../components/header/LeftHeaderComponent';
import RightHeaderComponent from '../components/header/RightHeaderComponent';
import HomeScreen from '../screen/Home/Home';
import ChatRoutes from './Chat.routes';
import { HomeRouteParamList } from '../types/routes';
import AccountRoutes from './Account.routes';
import ExploreRoutes from './Explore.routes';
import { styles } from '../theme/styles';

const Tab = createBottomTabNavigator<HomeRouteParamList>();

function HomeRoutes() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="ExploreRoutes"
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          fontFamily: 'Quicksand-Bold',
        },
        tabBarStyle: {
          height: 72,
          shadowColor: 'rgba(0, 0, 0, 0.08)',
          elevation: 1,
          borderTopColor: theme.colors.grey4,
          borderTopWidth: 0.25,
        },
        tabBarShowLabel: false,
        headerRight: RightHeaderComponent,
        headerTitleContainerStyle: { marginStart: 0 },
        headerLeftContainerStyle: {
          marginStart: styles.container.paddingHorizontal,
        },
        headerRightContainerStyle: {
          marginEnd: styles.container.paddingHorizontal,
        },
      }}
    >
      <Tab.Screen
        options={{
          headerTitleStyle: { display: 'none' },
          headerStyle: {
            backgroundColor: theme.colors.background,
            elevation: 0,
            shadowOpacity: 0,
            height: 90,
          },
          headerLeft: LeftHeaderComponent,
          tabBarIcon: HomeTabBarIcon,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="ExploreRoutes"
        component={ExploreRoutes}
        options={{
          tabBarIcon: ExploreTabBarIcon,
          title: 'Explore',
          headerShown: false,
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
        options={{
          tabBarIcon: UserTabBarIcon,
          title: 'Account',
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeRoutes;
