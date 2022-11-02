import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import SettingScreen from '../screen/Account/SettingScreen';
import { navigatorScreenOptions } from './HomeNavigator.routing';
import { AccountStackParamList } from './navigation.types';

const Stack = createNativeStackNavigator<AccountStackParamList>();

function AccountNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Setting"
      screenOptions={{
        ...navigatorScreenOptions,
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ title: 'Setting' }}
      />
    </Stack.Navigator>
  );
}

export default AccountNavigator;
