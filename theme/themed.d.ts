import '@rneui/themed';

declare module '@rneui/themed' {
  export interface Colors {
    cardBackground: string;
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
    bold?: boolean;
    medium?: boolean;
    subtitle1?: boolean;
    subtitle2?: boolean;
    caption?: boolean;
  }

  export interface ButtonProps {
    fullWidth?: boolean;
  }
}
