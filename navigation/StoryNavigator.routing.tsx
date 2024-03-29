import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import AddStoryScreen from '../screen/Story/AddStoryScreen';
import EditStoryScreen from '../screen/Story/EditStoryScreen';
import StoryDetailScreen from '../screen/Story/StoryDetailScreen';
import { navigatorScreenOptions } from './HomeNavigator.routing';
import { StoryStackParamList } from './navigation.types';

const Stack = createNativeStackNavigator<StoryStackParamList>();

function StoryNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="AddStory"
      screenOptions={{
        ...navigatorScreenOptions,
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="AddStory"
        component={AddStoryScreen}
        options={{ title: 'Add Story' }}
      />
      <Stack.Screen
        name="EditStory"
        component={EditStoryScreen}
        options={{ title: 'Edit Story' }}
      />
      <Stack.Screen
        name="StoryDetail"
        component={StoryDetailScreen}
        options={{ title: 'Replies' }}
      />
    </Stack.Navigator>
  );
}

export default StoryNavigator;
