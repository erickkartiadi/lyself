import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import * as React from 'react';

import LeftHeader from '../components/layout/LeftHeader';
import RightHeader from '../components/layout/RightHeader';
import AccountTabScreen from '../screen/AccountTabScreen';
import HomeTabScreen from '../screen/HomeTabScreen';
import NotificationTabScreen from '../screen/NotificationTabScreen';
import StoryTabScreen from '../screen/Story/StoryTabScreen';
import layout from '../styles/layout';
import { font } from '../styles/typhography';
import { GUTTER_SIZE, SIZING } from '../theme/theme';
import { HomeTabParamList } from './navigation.types';

const Tab = createBottomTabNavigator<HomeTabParamList>();

export const navigatorScreenOptions = {
  headerShadowVisible: false,
  headerTitleStyle: [font.size_xl, font.weight_normal],
  headerRight: RightHeader,
};

function HomeTabBarIcon({ focused, color, size }: TabBarIconOptions) {
  return (
    <Icon
      type="ionicon"
      name={focused ? 'home' : 'home-outline'}
      color={color}
      size={size}
    />
  );
}

function ExploreTabBarIcon({ focused, color, size }: TabBarIconOptions) {
  return (
    <Icon
      type="ionicon"
      name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
      color={color}
      size={size}
    />
  );
}
function ChatTabBarIcon({ focused, color, size }: TabBarIconOptions) {
  return (
    <Icon
      type="ionicon"
      name={focused ? 'notifications' : 'notifications-outline'}
      color={color}
      size={size}
    />
  );
}
function UserTabBarIcon({ focused, color, size }: TabBarIconOptions) {
  return (
    <Icon
      type="ionicon"
      name={focused ? 'person' : 'person-outline'}
      color={color}
      size={size}
    />
  );
}

function HomeNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Story"
      screenOptions={{
        ...navigatorScreenOptions,

        tabBarShowLabel: false,
        tabBarStyle: [
          {
            height: SIZING['8xl'],
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
          headerTitleStyle: layout.displayNone,
          headerLeft: LeftHeader,
          tabBarIcon: HomeTabBarIcon,
        }}
        name="Home"
        component={HomeTabScreen}
      />
      <Tab.Screen
        name="Story"
        component={StoryTabScreen}
        options={{
          tabBarIcon: ExploreTabBarIcon,
          title: 'Stories',
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationTabScreen}
        options={{ tabBarIcon: ChatTabBarIcon, title: 'Notification' }}
      />
      <Tab.Screen
        name="Account"
        component={AccountTabScreen}
        options={{
          tabBarIcon: UserTabBarIcon,
          title: 'Account',
        }}
      />
    </Tab.Navigator>
  );
}

type TabBarIconOptions = {
  focused: boolean;
  color: string;
  size: number;
};

export default HomeNavigator;
