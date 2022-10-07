import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  HomeTab: NavigatorScreenParams<HomeTabParamList>;
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
  Stories: undefined;
  Notification: undefined;
  Account: undefined;
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
