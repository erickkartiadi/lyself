import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Psychiatrist } from './types';

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  HomeTab: NavigatorScreenParams<HomeTabParamList>;
  ConsultStack: NavigatorScreenParams<ConsultStackParamList>;
  TodoStack: NavigatorScreenParams<TodoStackParamList>;
  InDevelopment: undefined;
};

export type AuthStackParamList = {
  GetStarted: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type HomeTabParamList = {
  Home: undefined;
  Explore: undefined;
  Chat: undefined;
  Account: undefined;
};

export type ConsultStackParamList = {
  Consult: undefined;
  Psychiatrist: Psychiatrist;
  Appointment: undefined;
};

export type TodoStackParamList = {
  Todo: undefined;
};

export type GetStartedScreenNavigationProps = NativeStackScreenProps<
  AuthStackParamList & RootStackParamList,
  'GetStarted'
>;

export type HomeScreenNavigationProps = NativeStackScreenProps<
  HomeTabParamList & RootStackParamList,
  'Home'
>;

export type LoginScreenNavigationProps = NativeStackScreenProps<
  AuthStackParamList & RootStackParamList,
  'Login'
>;

export type ForgotPasswordScreenNavigationProps = NativeStackScreenProps<
  AuthStackParamList,
  'ForgotPassword'
>;

export type RegisterScreenNavigationProps = NativeStackScreenProps<
  AuthStackParamList,
  'Register'
>;

export type TodoScreenNavigationProps = NativeStackScreenProps<
  TodoStackParamList,
  'Todo'
>;

export type AccountScreenNavigationProps = NativeStackScreenProps<
  HomeTabParamList & RootStackParamList,
  'Account'
>;

export type ConsultScreenNavigationProps = NativeStackScreenProps<
  ConsultStackParamList,
  'Consult'
>;

export type AppointmentScreenNavigationProps = NativeStackScreenProps<
  ConsultStackParamList,
  'Appointment'
>;

export type PsychiatristScreenNavigationProps = NativeStackScreenProps<
  ConsultStackParamList,
  'Psychiatrist'
>;
