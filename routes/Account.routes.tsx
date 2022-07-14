import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AccountRouteParamList } from './types';
import AccountPage from '../screen/Account/AccountPage';

const Stack = createNativeStackNavigator<AccountRouteParamList>();

function AccountRoutes() {
  return (
    <Stack.Navigator initialRouteName="Account">
      <Stack.Screen
        name="Account"
        component={AccountPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AccountRoutes;
