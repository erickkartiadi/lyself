import '@rneui/themed';

import { TextStyle } from 'react-native';

declare module '@rneui/themed' {
  export interface Colors {
    primaryDark: string;
    cardBackground: string;
    secondary: string;
    purple: string;
    blue: string;
    spotify: string;
    google: string;
    facebook: string;
    apple: string;
  }

  export interface TextProps {
    subtitle?: boolean;
    subtitle2?: boolean;
    caption?: boolean;
    small?: boolean;
    color?: TextStyle['color'];
  }

  export interface ButtonProps {
    fullWidth?: boolean;
  }
}
