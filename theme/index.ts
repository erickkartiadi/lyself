import {
  CreateThemeOptions,
  createTheme,
  themeSpacing,
} from '@rneui/themed/dist/config/ThemeProvider';

import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

const myCustomColorsLight = {};

const myCustomColorsDark = {};

const myTheme: CreateThemeOptions = createTheme({
  Card: {
    containerStyle: {
      margin: 0,
      marginTop: themeSpacing.lg,
      marginBottom: themeSpacing.lg,
      borderRadius: themeSpacing.lg,
    },
  },
  Text: (props) => ({
    style: {
      fontWeight: props.bold ? 'bold' : 'normal',
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
  }),
  Button: {
    titleStyle: {
      fontFamily: 'Inter',
    },
  },
  lightColors: {
    primary: '#F26D85',
    primaryLight: '#FFE3E9',
    primaryDark: '#CC4B66',
    secondary: '#3FB0EB',
    secondaryLight: '#67CEFF',
    secondaryDark: '#008CC5',
    purple: '#9267ED',
    yellow: '#FABD22',
    background: '#ffffff',
    ...myCustomColorsLight,
  },
  darkColors: {
    primary: '#bb3b58',
    primaryLight: '#FE788F',
    primaryDark: '#0C84BB',
    secondary: '#0081b8',
    secondaryLight: '#67CEFF',
    secondaryDark: '#0081b8',
    purple: '#6A44C5',
    yellow: '#C89200',
    background: '#121212',
    ...myCustomColorsDark,
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
