import { Icon } from '@rneui/themed';
import * as React from 'react';

export type TabBarIconOptions = {
  focused: boolean;
  color: string;
  size: number;
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
      name={focused ? 'person-circle' : 'person-circle-outline'}
      color={color}
      size={size}
    />
  );
}

export { UserTabBarIcon, HomeTabBarIcon, ExploreTabBarIcon, ChatTabBarIcon };
