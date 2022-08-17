import '@rneui/themed';

declare module '@rneui/themed' {
  export interface Colors {
    primaryLight: string;
    primaryDark: string;
    secondaryLight: string;
    secondaryDark: string;
    cardBackground: string;
    textColor: string;
    purple: string;
    yellow: string;
    brand: {
      spotify: string;
      google: string;
      facebook: string;
      apple: string;
    };
  }

  export interface TextProps {
    bold?: boolean;
    subtitle1?: boolean;
    subtitle2?: boolean;
    caption?: boolean;
  }

  export interface ButtonProps {
    fullWidth?: boolean;
  }
}
