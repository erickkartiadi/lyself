import { CreateThemeOptions, createTheme } from '@rneui/themed';
import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const themeSpacing = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
};

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: themeSpacing.xl,
  },
  noContainerOffset: {
    marginHorizontal: themeSpacing.xl * -1,
  },
  containerSection: {
    paddingHorizontal: themeSpacing.xl,
    marginTop: themeSpacing.xl,
    marginBottom: themeSpacing.md,
  },
});

const myTheme: CreateThemeOptions = createTheme({
  spacing: { ...themeSpacing },
  Card: {
    containerStyle: {
      margin: 0,
      padding: themeSpacing.lg,
      marginTop: themeSpacing.md,
      marginBottom: themeSpacing.md,
    },
  },
  SearchBar: {
    style: {
      fontFamily: 'OpenSans',
    },
  },
  CheckBox: {
    fontFamily: 'OpenSans',
    textStyle: { fontWeight: '400' },
  },
  Text: (props) => ({
    style: {
      fontSize: props.sm ? 12.44 : 14,
      letterSpacing: 0.1,
    },
    h1Style: {
      fontSize: 19.93,
      fontFamily: 'OpenSans-Medium',
      fontWeight: '500',
      letterSpacing: 0.15,
      marginBottom: themeSpacing.md,
    },
    h2Style: {
      fontSize: 17.72,
      fontFamily: 'OpenSans-Medium',
      fontWeight: '500',
      letterSpacing: 0.075,
      marginBottom: themeSpacing.sm,
    },
    h3Style: {
      fontSize: 15.75,
      fontFamily: 'OpenSans-Semibold',
      fontWeight: '600',
      letterSpacing: 0,
      marginBottom: themeSpacing.xs,
    },
    h4Style: {
      fontSize: 14,
      fontFamily: 'OpenSans-Semibold',
      fontWeight: '600',
      letterSpacing: 0.15,
      marginBottom: themeSpacing.xs,
    },
  }),
  Button: (props) => ({
    radius: 999,
    containerStyle: {
      alignItems: props.fullWidth ? 'stretch' : 'center',
    },
    titleStyle: {
      fontFamily: 'OpenSans-Semibold',
      fontWeight: '600',
      fontSize: 14,
      letterSpacing: 0.15,
    },
  }),
  lightColors: {
    primary: '#F26D85',
    primaryLight: '#FFE3E9',
    primaryDark: '#CC4B66',
    secondary: '#3FB0EB',
    secondaryLight: '#67CEFF',
    secondaryDark: '#008CC5',
    purple: '#9267ED',
    yellow: '#FABD22',
    background: '#fbfbfb',
    cardBackground: '#ffffff',
    textColor: '#242424',
    brand: {
      spotify: '#1db954',
    },
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
    background: '#1f1f1f',
    cardBackground: '#222222',
    textColor: '#f2f2f2',
    brand: {
      spotify: '#1db954',
    },
  },
});

const navThemeLight: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: myTheme.lightColors?.primary as string,
    background: myTheme.lightColors?.background as string,
    card: myTheme.lightColors?.cardBackground as string,
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
    card: myTheme.darkColors?.cardBackground as string,
    border: myTheme.darkColors?.grey4 as string,
    notification: myTheme.darkColors?.error as string,
  },
};

export { myTheme, navThemeLight, navThemeDark };
