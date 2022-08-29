import { NavigatorScreenParams } from '@react-navigation/native';

type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  HomeTab: NavigatorScreenParams<HomeTabParamList>;
  ConsultStack: NavigatorScreenParams<ConsultStackParamList>;
  InDevelopment: undefined;
  // MeditationStack: NavigatorScreenParams<MeditationStackParamList>;
  // ForumStack: NavigatorScreenParams<ForumStackParamList>;
  // MusicStack: NavigatorScreenParams<MusicStackParamList>;
  // TodoStack: NavigatorScreenParams<TodoStackParamList>;
  // BreathingStack: NavigatorScreenParams<BreathingStackParamList>;
  // ArticleStack: NavigatorScreenParams<ArticleStackParamList>;
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
  Psychiatrist: {
    uri: string;
    experience: number;
    patients: number;
    name: string;
    rating: number;
    specialty: string;
    description: string;
  };
};

export {
  RootStackParamList,
  HomeTabParamList,
  AuthStackParamList,
  ConsultStackParamList,
};
