import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Story } from '../types/types';

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  HomeTab: NavigatorScreenParams<HomeTabParamList>;
  StoryStack: NavigatorScreenParams<StoryStackParamList>;
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
  Story: undefined;
  Todo: undefined;
  Account: undefined;
};

export type TodoStackParamList = {
  Todo: undefined;
};

export type StoryStackParamList = {
  AddStory: undefined;
  EditStory: Omit<Story, 'createdAt' | 'creatorId'>;
  StoryDetail: Story;
};

export type GetStartedScreenNavigationProps = NativeStackScreenProps<
  AuthStackParamList & RootStackParamList,
  'GetStarted'
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

export type HomeScreenNavigationProps = NativeStackScreenProps<
  HomeTabParamList & RootStackParamList,
  'Home'
>;

export type TodoScreenNavigationProps = NativeStackScreenProps<
  TodoStackParamList,
  'Todo'
>;

export type AddStoryScreenNavigationProps = NativeStackScreenProps<
  StoryStackParamList,
  'AddStory'
>;

export type EditStoryScreenNavigationProps = NativeStackScreenProps<
  StoryStackParamList,
  'EditStory'
>;

export type StoryDetailScreenNavigationProps = NativeStackScreenProps<
  StoryStackParamList,
  'StoryDetail'
>;

export type AccountScreenNavigationProps = NativeStackScreenProps<
  HomeTabParamList & RootStackParamList,
  'Account'
>;

export type StoryScreenNavigationProps = NativeStackScreenProps<
  HomeTabParamList & RootStackParamList,
  'Story'
>;
