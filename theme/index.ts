import {
  CreateThemeOptions,
  createTheme,
} from '@rneui/themed/dist/config/ThemeProvider';

import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

const myTheme: CreateThemeOptions = createTheme({
  Text: {
    style: {
      fontFamily: 'Inter',
    },
    h1Style: {
      fontFamily: 'Inter',
    },
    h2Style: {
      fontFamily: 'Inter',
    },
    h3Style: {
      fontFamily: 'Inter',
    },
    h4Style: {
      fontFamily: 'Inter',
    },
  },
  Button: {
    titleStyle: {
      fontFamily: 'Inter',
    },
  },
  lightColors: {
    primary: '#F26D85',
    secondary: '#3FB0EB',
    background: '#ffffff',
  },
  darkColors: {
    primary: '#bb3b58',
    secondary: '#0081b8',
    background: '#121212',
  },
});

const navThemeLight: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: myTheme.lightColors?.primary as string,
    background: myTheme.lightColors?.background as string,
    card: myTheme.lightColors?.background as string,
    border: myTheme.lightColors?.grey4 as string,
    notification: myTheme.lightColors?.error as string,
  },
};

const navThemeDark: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: myTheme.darkColors?.primary as string,
    background: myTheme.darkColors?.background as string,
    card: myTheme.darkColors?.background as string,
    border: myTheme.darkColors?.grey4 as string,
    notification: myTheme.darkColors?.error as string,
  },
};

export { myTheme, navThemeLight, navThemeDark };
