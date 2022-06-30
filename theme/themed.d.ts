import '@rneui/themed';

declare module '@rneui/themed' {
  export interface Colors {
    primaryLight: string;
    primaryDark: string;
    secondaryLight: string;
    secondaryDark: string;

    purple: string;
    yellow: string;
  }

  export interface TextProps {
    bold?: boolean;
  }
}
