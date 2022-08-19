import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InDevelopment from '../screen/ErrorPages/InDevelopment';
import ExplorePage from '../screen/Explore/ExplorePage';
import { ExploreRouteParamList } from '../types/routes';
import ConsultPage from '../screen/Explore/ConsultPage';

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
        name="Consult"
        component={ConsultPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InDevelopment"
        component={InDevelopment}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default ExploreRoutes;
