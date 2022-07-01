import {
  CreateThemeOptions,
  createTheme,
  themeSpacing,
} from '@rneui/themed/dist/config/ThemeProvider';

import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

const myTheme: CreateThemeOptions = createTheme({
  Card: {
    containerStyle: {
      margin: 0,
      padding: themeSpacing.xl,
      marginTop: themeSpacing.md,
      marginBottom: themeSpacing.md,
    },
  },
  Text: (props) => ({
    style: {
      fontFamily: 'Inter',
      fontWeight: props.bold ? 'bold' : 'normal',
      fontSize: props.lg ? 16 : 14,
      letterSpacing: 0.01,
    },
    h1Style: {
      fontFamily: 'Inter-Bold',
      fontSize: 29.03,
      fontWeight: 'bold',
      letterSpacing: -0.02,
    },
    h2Style: {
      fontFamily: 'Inter-Bold',
      fontSize: 24.19,
      letterSpacing: -0.018,
      fontWeight: 'bold',
    },
    h3Style: {
      fontFamily: 'Inter-Semibold',
      fontWeight: '600',
      fontSize: 20.16,
      letterSpacing: -0.0175,
    },
    h4Style: {
      fontFamily: 'Inter-Medium',
      fontWeight: '500',
      fontSize: 16.8,
      letterSpacing: -0.75,
    },
  }),
  Button: {
    titleStyle: {
      fontFamily: 'Inter-Medium',
      fontWeight: '500',
      fontSize: 14,
      letterSpacing: 0.5,
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
    cardBackground: '#f7f7f7',
    textColor: '#242424',
  },
  darkColors: {
    primary: '#bb3b58',
    primaryLight: '#FE788F',
    primaryDark: '#bb3b58',
    secondary: '#0081b8',
    secondaryLight: '#67CEFF',
    secondaryDark: '#0081b8',
    purple: '#6A44C5',
    yellow: '#C89200',
    background: '#121212',
    cardBackground: '#222222',
    textColor: '#f2f2f2',
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
