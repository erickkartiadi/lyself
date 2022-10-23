import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, useTheme } from '@rneui/themed';
import * as React from 'react';

import Avatar from '../components/base/Avatar';
import LeftHeader from '../components/layout/LeftHeader';
import RightHeader from '../components/layout/RightHeader';
import AccountScreen from '../screen/AccountScreen';
import HomeScreen from '../screen/HomeScreen';
import StoryScreen from '../screen/Story/StoryScreen';
import TodoScreen from '../screen/Todo/TodoScreen';
import { useFindUser } from '../services/api/user/users.hooks';
import border from '../styles/border';
import layout from '../styles/layout';
import { height } from '../styles/size';
import spacing from '../styles/spacing';
import { font } from '../styles/typhography';
import { GUTTER_SIZE } from '../theme/theme';
import { AuthContext } from '../utils/context/AuthContext';
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

function StoryTabBarIcon({ focused, color, size }: TabBarIconOptions) {
  return (
    <Icon
      type="ionicon"
      name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
      color={color}
      size={size}
    />
  );
}
function TodoTabBarIcon({ focused, color, size }: TabBarIconOptions) {
  return (
    <Icon
      type="ionicon"
      name={focused ? 'checkbox' : 'checkbox-outline'}
      color={color}
      size={size}
    />
  );
}
function UserTabBarIcon({ focused, color, size }: TabBarIconOptions) {
  const { user } = React.useContext(AuthContext);
  const { data: currentUserData } = useFindUser(user?.uid);
  const { theme } = useTheme();

  return (
    <Avatar
      size={size}
      containerStyle={[
        spacing.mr_xl,
        border.width_lg,
        {
          borderColor: focused ? color : theme.colors.grey5,
          borderWidth: currentUserData?.photoURL && focused ? 1.5 : 0,
        },
      ]}
      avatarUrl={currentUserData?.photoURL}
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
        tabBarStyle: height.h_8xl,
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
          headerTitleStyle: layout.display_none,
          headerLeft: LeftHeader,
          tabBarIcon: HomeTabBarIcon,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Story"
        component={StoryScreen}
        options={{
          tabBarIcon: StoryTabBarIcon,
          title: 'Stories',
        }}
      />
      <Tab.Screen
        name="Todo"
        component={TodoScreen}
        options={{ tabBarIcon: TodoTabBarIcon }}
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
