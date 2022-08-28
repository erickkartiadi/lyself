import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AccountStackParamList } from '../../types/param';
import AccountScreen from '../../screen/Account/AccountScreen';

const Stack = createNativeStackNavigator<AccountStackParamList>();

function AccountNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Account" component={AccountScreen} />
    </Stack.Navigator>
  );
}

export default AccountNavigator;
