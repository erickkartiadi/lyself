import '@rneui/themed';

declare module '@rneui/themed' {
  export interface Colors {
    primaryDark: string;
    cardBackground: string;
    secondary: string;
    purple: string;
    yellow: string;
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
  }

  export interface ButtonProps {
    fullWidth?: boolean;
  }
}
