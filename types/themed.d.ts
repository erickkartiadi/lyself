import '@rneui/themed';

declare module '@rneui/themed' {
  export interface Colors {
    primaryDark: string;
    cardBackground: string;
    secondary: string;
    purple: string;
    yellow: string;
    yellowDark: string;
    blueLight: string;
    blue: string;
    green: string;
    greenLight: string;
    spotify: string;
    google: string;
    facebook: string;
    apple: string;
  }

  export interface ThemeSpacing {
    '2xl': number;
  }

  export interface TextProps {
    subtitle?: boolean;
    subtitle2?: boolean;
    subtitle3?: boolean;
    caption?: boolean;
    small?: boolean;
  }
}
