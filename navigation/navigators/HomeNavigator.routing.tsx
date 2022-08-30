import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useTheme } from '@rneui/themed';
import {
  ChatTabBarIcon,
  ExploreTabBarIcon,
  HomeTabBarIcon,
  UserTabBarIcon,
} from '../../components/BottomTabBarIcons';
import LeftHeader from '../../components/header/LeftHeader';
import RightHeader from '../../components/header/RightHeader';
import HomeScreen from '../../screen/Home/HomeScreen';
import { HomeTabParamList } from '../param.types';
import { FONT_FAMILY, FONT_SIZE, GUTTER_SIZE } from '../../theme/styles';
import ChatScreen from '../../screen/Home/ChatScreen';
import AccountScreen from '../../screen/Home/AccountScreen';
import ExploreScreen from '../../screen/Home/ExploreScreen';

const Tab = createBottomTabNavigator<HomeTabParamList>();

export const navigatorScreenOptions = {
  headerShadowVisible: false,
  headerTitleStyle: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: FONT_SIZE.heading4,
  },
  headerRight: RightHeader,
};

function HomeNavigator() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        ...navigatorScreenOptions,
        headerStyle: { backgroundColor: theme.colors.background },
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
        },
        headerTitleContainerStyle: { marginStart: 0 },
        headerLeftContainerStyle: {
          marginStart: GUTTER_SIZE,
        },
        headerRightContainerStyle: {
          marginEnd: GUTTER_SIZE,
        },
      }}
    >
      <Tab.Screen
        options={{
          headerTitleStyle: { display: 'none' },
          headerStyle: {
            backgroundColor: theme.colors.background,
            height: 90,
          },
          headerLeft: LeftHeader,
          tabBarIcon: HomeTabBarIcon,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ExploreTabBarIcon,
          title: 'Explore',
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{ tabBarIcon: ChatTabBarIcon, title: 'Chat' }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: UserTabBarIcon,
          title: 'Account',
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeNavigator;
