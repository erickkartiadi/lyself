import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AuthStackParamList,
  ConsultStackParamList,
  HomeTabParamList,
  RootStackParamList,
} from './param.types';

type GetStartedScreenNavigationProps = NativeStackScreenProps<
  AuthStackParamList & RootStackParamList,
  'GetStarted'
>;

type LoginScreenNavigationProps = NativeStackScreenProps<
  AuthStackParamList & RootStackParamList,
  'AuthStack'
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

type AccountScreenNavigationProps = NativeStackScreenProps<
  HomeTabParamList & RootStackParamList,
  'Account'
>;

type ConsultScreenNavigationProps = NativeStackScreenProps<
  ConsultStackParamList,
  'Consult'
>;

export {
  LoginScreenNavigationProps,
  ForgotPasswordScreenNavigationProps,
  GetStartedScreenNavigationProps,
  RegisterScreenNavigationProps,
  AccountScreenNavigationProps,
  ExploreScreenNavigationProps,
  ConsultScreenNavigationProps,
};
