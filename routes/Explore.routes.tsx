import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@rneui/themed';
import InDevelopmentScreen from '../screen/Error/InDevelopmentScreen';
import ExploreScreen from '../screen/Explore/ExploreScreen';
import { ExploreRouteParamList } from '../types/routes';
import ConsultScreen from '../screen/Explore/ConsultScreen';
import RightHeaderComponent from '../components/organisms/header/RightHeaderComponent';
import PsychiatristScreen from '../screen/Explore/PsychiatristScreen';
import { FONT_FAMILY } from '../theme/styles';

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
          fontFamily: FONT_FAMILY.bold,
        },
        headerTitleAlign: 'center',
        headerRight: RightHeaderComponent,
      }}
    >
      <Stack.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ headerTitleAlign: 'left' }}
      />
      <Stack.Screen name="Consult" component={ConsultScreen} />
      <Stack.Screen
        name="Psychiatrist"
        component={PsychiatristScreen}
        options={{ headerTitle: '', headerRight: () => null }}
      />
      <Stack.Screen name="InDevelopment" component={InDevelopmentScreen} />
    </Stack.Navigator>
  );
}

export default ExploreRoutes;
