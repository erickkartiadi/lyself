import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@rneui/themed';
import InDevelopment from '../screen/ErrorPages/InDevelopment';
import ExplorePage from '../screen/Explore/ExplorePage';
import { ExploreRouteParamList } from '../types/routes';
import ConsultPage from '../screen/Explore/ConsultPage';
import RightHeaderComponent from '../components/header/RightHeaderComponent';
import PsychiatristPage from '../screen/Explore/PsychiatristPage';

const Stack = createNativeStackNavigator<ExploreRouteParamList>();

function ExploreRoutes() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Explore"
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          fontFamily: 'Quicksand-Bold',
        },
        headerTitleAlign: 'center',
        headerRight: RightHeaderComponent,
      }}
    >
      <Stack.Screen
        name="Explore"
        component={ExplorePage}
        options={{ headerTitleAlign: 'left' }}
      />
      <Stack.Screen name="Consult" component={ConsultPage} />
      <Stack.Screen
        name="Psychiatrist"
        component={PsychiatristPage}
        options={{ headerTitle: '', headerRight: () => null }}
      />
      <Stack.Screen name="InDevelopment" component={InDevelopment} />
    </Stack.Navigator>
  );
}

export default ExploreRoutes;
