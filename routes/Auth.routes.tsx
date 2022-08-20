import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AuthRouteParamList } from '../types/routes';
import LoginPage from '../screen/Auth/LoginPage';
import RegisterPage from '../screen/Auth/RegisterPage';
import ForgotPasswordPage from '../screen/Auth/ForgotPasswordPage';
import GetStartedPage from '../screen/Auth/GetStartedPage';

const Stack = createNativeStackNavigator<AuthRouteParamList>();

function AuthRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="GetStarted"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
      <Stack.Screen name="GetStarted" component={GetStartedPage} />
    </Stack.Navigator>
  );
}

export default AuthRoutes;
