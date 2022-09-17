import '@rneui/themed';

declare module '@rneui/themed' {
  export interface Colors {
    primaryLight: string;
    primaryDark: string;
    secondary: string;
    purple: string;
    yellow: string;
    blue: string;
    brand: {
      spotify: {
        green: string;
      };
      google: {
        red: string;
      };
      facebook: {
        blue: string;
      };
      apple: {
        black: string;
      };
    };
  }

  export interface TextProps {
    subtitle?: boolean;
    caption?: boolean;
    small?: boolean;
  }

  export interface ButtonProps {
    fullWidth?: boolean;
  }
}
