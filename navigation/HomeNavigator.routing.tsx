import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import {
  ChatTabBarIcon,
  ExploreTabBarIcon,
  HomeTabBarIcon,
  UserTabBarIcon,
} from '../components/BottomTabBarIcons';
import LeftHeader from '../components/LeftHeader';
import RightHeader from '../components/RightHeader';
import AccountScreen from '../screen/Home/AccountScreen';
import ChatScreen from '../screen/Home/ChatScreen';
import ExploreScreen from '../screen/Home/ExploreScreen';
import HomeScreen from '../screen/Home/HomeScreen';
import { FONT_FAMILY, FONT_SIZE, GUTTER_SIZE, styles } from '../theme/styles';
import { HomeTabParamList } from '../types/navigation.types';

const Tab = createBottomTabNavigator<HomeTabParamList>();

export const navigatorScreenOptions = {
  headerShadowVisible: false,
  headerTitleStyle: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.heading4,
  },
  headerRight: RightHeader,
};

function HomeNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        ...navigatorScreenOptions,
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.shadowMedium,
          {
            borderTopWidth: 0,
            height: 70,
          },
        ],
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
