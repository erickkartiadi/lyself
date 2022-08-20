import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AccountRouteParamList } from '../types/routes';
import AccountPage from '../screen/Account/AccountPage';

const Stack = createNativeStackNavigator<AccountRouteParamList>();

function AccountRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Account" component={AccountPage} />
    </Stack.Navigator>
  );
}

export default AccountRoutes;
