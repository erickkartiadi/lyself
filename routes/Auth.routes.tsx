import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AuthRouteParamList } from '../types/routes';
import LoginScreen from '../screen/Auth/LoginScreen';
import RegisterScreen from '../screen/Auth/RegisterScreen';
import GetStartedScreen from '../screen/Auth/GetStartedScreen';
import ForgotPasswordScreen from '../screen/Auth/ForgotPasswordScreen';

const Stack = createNativeStackNavigator<AuthRouteParamList>();

function AuthRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="GetStarted"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="GetStarted" component={GetStartedScreen} />
    </Stack.Navigator>
  );
}

export default AuthRoutes;
