import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Progress from '../screen/ErrorPages/InDevelopment';
import ExplorePage from '../screen/Explore/ExplorePage';
import { ExploreRouteParamList } from '../types/routes';

const Stack = createNativeStackNavigator<ExploreRouteParamList>();

function ExploreRoutes() {
  return (
    <Stack.Navigator initialRouteName="Explore">
      <Stack.Screen
        name="Explore"
        component={ExplorePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Progress"
        component={Progress}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default ExploreRoutes;
