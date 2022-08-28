import { NavigatorScreenParams } from '@react-navigation/native';

// tree height = 2

type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  HomeTab: NavigatorScreenParams<HomeTabParamList>;
};

// tree height = 1

type AuthStackParamList = {
  GetStarted: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

type HomeTabParamList = {
  Home: undefined;
  ExploreStack: NavigatorScreenParams<ExploreStackParamList>;
  ChatStack: NavigatorScreenParams<ChatStackParamList>;
  AccountStack: NavigatorScreenParams<AccountStackParamList>;
};

// tree height = 0

type ExploreStackParamList = {
  Explore: undefined;
  Consult: undefined;
  Psychiatrist: {
    uri: string;
    experience: string;
    name: string;
    rating: string;
    specialty: string;
  };
  InDevelopment: undefined;
};

type ChatStackParamList = {
  Chat: undefined;
  Psychiatrist: undefined;
};

type AccountStackParamList = {
  Account: undefined;
};

export {
  RootStackParamList,
  HomeTabParamList,
  AuthStackParamList,
  ChatStackParamList,
  ExploreStackParamList,
  AccountStackParamList,
};
