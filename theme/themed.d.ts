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
    };
  }

  export interface TextProps {
    bold?: boolean;
    sm?: boolean;
    grey?: boolean;
  }

  export interface ButtonProps {
    fullWidth?: boolean;
  }
}
