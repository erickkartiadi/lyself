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
    paddingHorizontal: themeSpacing.lg,
  },
  noContainerOffset: {
    marginHorizontal: themeSpacing.lg * -1,
  },
  containerSection: {
    paddingHorizontal: themeSpacing.lg,
    paddingTop: themeSpacing.md,
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
  Text: (props) => ({
    style: {
      fontFamily: props.bold ? 'Inter-Semibold' : 'Inter',
      fontWeight: props.bold ? '600' : 'normal',
      fontSize: props.sm ? 12.5 : 14,
    },
    h1Style: {
      fontFamily: 'Inter-Bold',
      fontSize: 22.43,
      fontWeight: 'bold',
      letterSpacing: -0.0175,
    },
    h2Style: {
      fontFamily: 'Inter-Bold',
      fontSize: 19.93,
      letterSpacing: -0.017,
      fontWeight: 'bold',
    },
    h3Style: {
      fontFamily: 'Inter-Semibold',
      fontWeight: '600',
      fontSize: 17.72,
      letterSpacing: -0.0125,
    },
    h4Style: {
      fontFamily: 'Inter-Semibold',
      fontWeight: '600',
      fontSize: 15.75,
      letterSpacing: -0.25,
    },
  }),
  Button: (props) => ({
    radius: themeSpacing.md,
    iconContainerStyle: {
      marginEnd: props.iconPosition === 'left' ? themeSpacing.md : 0,
      marginStart: props.iconPosition === 'right' ? themeSpacing.md : 0,
    },
    containerStyle: {
      alignItems: props.fullWidth ? 'stretch' : 'center',
      marginHorizontal: styles.containerSection.paddingHorizontal,
    },
    buttonStyle: {
      paddingVertical: themeSpacing.lg,
      paddingHorizontal: themeSpacing.lg,
    },
    titleStyle: {
      fontFamily: 'Inter-Medium',
      fontWeight: '500',
      fontSize: 14,
      letterSpacing: -0.125,
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
