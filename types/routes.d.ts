export type ChatRouteParamList = {
  Chat: undefined;
  Psychiatrist: undefined;
};

export type AuthRouteParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  GetStarted: undefined;
};

export type ExploreRouteParamList = {
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

export type AccountRouteParamList = {
  Account: undefined;
};

export type HomeRouteParamList = {
  Home: undefined;
  ChatRoutes: undefined;
  ExploreRoutes: undefined;
  AccountRoutes: undefined;
};

export type RootRouteParamList = {
  AuthRoutes: undefined;
  HomeRoutes: undefined;
};
