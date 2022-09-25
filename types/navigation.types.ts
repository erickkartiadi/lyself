import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Psychiatrist } from './types';

type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  HomeTab: NavigatorScreenParams<HomeTabParamList>;
  ConsultStack: NavigatorScreenParams<ConsultStackParamList>;
  TodoStack: NavigatorScreenParams<TodoStackParamList>;
  InDevelopment: undefined;
};

type AuthStackParamList = {
  GetStarted: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

type HomeTabParamList = {
  Home: undefined;
  Explore: undefined;
  Chat: undefined;
  Account: undefined;
};

type ConsultStackParamList = {
  Consult: undefined;
  Psychiatrist: Psychiatrist;
  Appointment: undefined;
};

type TodoStackParamList = {
  Todo: undefined;
};

type GetStartedScreenNavigationProps = NativeStackScreenProps<
  AuthStackParamList & RootStackParamList,
  'GetStarted'
>;

type LoginScreenNavigationProps = NativeStackScreenProps<
  AuthStackParamList & RootStackParamList,
  'Login'
>;

type ForgotPasswordScreenNavigationProps = NativeStackScreenProps<
  AuthStackParamList,
  'ForgotPassword'
>;

type RegisterScreenNavigationProps = NativeStackScreenProps<
  AuthStackParamList,
  'Register'
>;

type ExploreScreenNavigationProps = NativeStackScreenProps<
  HomeTabParamList & RootStackParamList,
  'Explore'
>;
type TodoScreenNavigationProps = NativeStackScreenProps<TodoStackParamList, 'Todo'>;

type AccountScreenNavigationProps = NativeStackScreenProps<
  HomeTabParamList & RootStackParamList,
  'Account'
>;

type ConsultScreenNavigationProps = NativeStackScreenProps<
  ConsultStackParamList,
  'Consult'
>;

type PsychiatristScreenNavigationProps = NativeStackScreenProps<
  ConsultStackParamList,
  'Psychiatrist'
>;

export {
  AccountScreenNavigationProps,
  AuthStackParamList,
  ConsultScreenNavigationProps,
  ConsultStackParamList,
  ExploreScreenNavigationProps,
  ForgotPasswordScreenNavigationProps,
  GetStartedScreenNavigationProps,
  HomeTabParamList,
  LoginScreenNavigationProps,
  PsychiatristScreenNavigationProps,
  RegisterScreenNavigationProps,
  RootStackParamList,
  TodoScreenNavigationProps,
  TodoStackParamList,
};
