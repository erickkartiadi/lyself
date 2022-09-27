import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import * as React from 'react';

import LeftHeader from '../components/header/LeftHeader';
import RightHeader from '../components/header/RightHeader';
import AccountScreen from '../screen/Home/AccountScreen';
import ChatScreen from '../screen/Home/ChatScreen';
import ExploreScreen from '../screen/Home/ExploreScreen';
import HomeScreen from '../screen/Home/HomeScreen';
import { FONT_FAMILY, GUTTER_SIZE, styles } from '../theme/styles';
import { HomeTabParamList } from '../types/navigation.types';

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
      name={focused ? 'compass' : 'compass-outline'}
      color={color}
      size={size}
    />
  );
}
function ChatTabBarIcon({ focused, color, size }: TabBarIconOptions) {
  return (
    <Icon
      type="ionicon"
      name={focused ? 'chatbox' : 'chatbox-outline'}
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

type TabBarIconOptions = {
  focused: boolean;
  color: string;
  size: number;
};

export default HomeNavigator;
