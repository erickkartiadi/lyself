import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import * as React from 'react';

import LeftHeader from '../components/layout/LeftHeader';
import RightHeader from '../components/layout/RightHeader';
import AccountScreen from '../screen/AccountScreen';
import HomeScreen from '../screen/HomeScreen';
import NotificationScreen from '../screen/NotificationScreen';
import StoriesScreen from '../screen/Stories/StoriesScreen';
import { FONT_FAMILY, GUTTER_SIZE, styles } from '../theme/styles';
import { HomeTabParamList } from './navigation.types';

const Tab = createBottomTabNavigator<HomeTabParamList>();

export const navigatorScreenOptions = {
  headerShadowVisible: false,
  headerTitleStyle: {
    fontFamily: FONT_FAMILY.medium,
  },
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
        name="Stories"
        component={StoriesScreen}
        options={{
          tabBarIcon: ExploreTabBarIcon,
          title: 'Stories',
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ tabBarIcon: ChatTabBarIcon, title: 'Notification' }}
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

type TabBarIconOptions = {
  focused: boolean;
  color: string;
  size: number;
};

export default HomeNavigator;
