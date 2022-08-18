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

const lightColors = {
  primary: '#F26D85',
  primaryLight: '#FFE3E9',
  primaryDark: '#CC4B66',
  secondary: '#3FB0EB',
  secondaryLight: '#67CEFF',
  secondaryDark: '#008CC5',
  purple: '#9267ED',
  yellow: '#FABD22',
  background: '#ffffff',
  cardBackground: '#fdfdfd',
  textColor: '#242424',
  brand: {
    spotify: '#1db954',
    google: '#ea4335',
    facebook: '#1877f2',
    apple: '#000000',
  },
};
const darkColors = {
  primary: '#bb3b58',
  primaryLight: '#FE788F',
  primaryDark: '#bb3b58',
  secondary: '#0081b8',
  secondaryLight: '#67CEFF',
  secondaryDark: '#0081b8',
  purple: '#6A44C5',
  yellow: '#C89200',
  background: '#080808',
  cardBackground: '#171717',
  textColor: '#f2f2f2',
  brand: {
    spotify: '#1db954',
    google: '#ea4335',
    facebook: '#1877f2',
    apple: '#000000',
  },
};
const myTheme: CreateThemeOptions = createTheme({
  spacing: { ...themeSpacing },
  Input: {
    labelStyle: {
      fontSize: 14.22,
      fontFamily: 'Quicksand-Medium',
      fontWeight: '500',
      letterSpacing: 0.1,
      marginBottom: themeSpacing.xs,
    },
    inputStyle: { fontFamily: 'Quicksand', fontSize: 16 },
    inputContainerStyle: {
      borderBottomWidth: 0.75,
    },
    containerStyle: { paddingHorizontal: 0 },
  },
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
      fontFamily: 'Quicksand',
    },
    inputStyle: {
      fontSize: 14.22,
    },
  },
  CheckBox: {
    fontFamily: 'Quicksand-Medium',
    textStyle: { fontWeight: '500', marginTop: -4 },
    containerStyle: {
      padding: 0,
      marginLeft: 0,
      paddingVertical: themeSpacing.md,
    },
  },
  Text: (props) => ({
    style: {
      // default
      ...{
        fontSize: 16,
        letterSpacing: 0.5,
        fontFamily: 'Quicksand',
        fontWeight: '400',
      },
      ...(props.bold && {
        fontWeight: '700',
        fontFamily: 'Quicksand-Bold',
      }),
      ...(props.subtitle1 && {
        fontSize: 16,
        fontFamily: 'Quicksand-Medium',
        fontWeight: '500',
        letterSpacing: 0.15,
        marginBottom: themeSpacing.xs,
      }),
      ...(props.subtitle2 && {
        fontSize: 14.22,
        fontFamily: 'Quicksand',
        letterSpacing: 0.15,
      }),
      ...(props.caption && {
        fontSize: 12.64,
        fontFamily: 'Quicksand',
        fontWeight: '400',
        letterSpacing: 0.3,
      }),
    },
    h1Style: {
      fontSize: 25.63,
      fontFamily: 'Quicksand-Medium',
      fontWeight: '500',
      letterSpacing: -0.25,
      marginBottom: themeSpacing.sm,
      ...(props.bold && {
        fontWeight: '700',
        fontFamily: 'Quicksand-Bold',
      }),
    },
    h2Style: {
      fontSize: 22.78,
      fontFamily: 'Quicksand-Medium',
      fontWeight: '500',
      letterSpacing: 0.125,
      marginBottom: themeSpacing.sm,
      ...(props.bold && {
        fontWeight: '700',
        fontFamily: 'Quicksand-Bold',
      }),
    },
    h3Style: {
      fontSize: 20.25,
      fontFamily: 'Quicksand-Medium',
      fontWeight: '500',
      letterSpacing: 0.1,
      marginBottom: themeSpacing.sm,
      ...(props.bold && {
        fontWeight: '700',
        fontFamily: 'Quicksand-Bold',
      }),
    },
    h4Style: {
      fontSize: 18,
      fontFamily: 'Quicksand-Bold',
      fontWeight: '700',
      letterSpacing: 0.25,
      marginBottom: themeSpacing.sm,
      ...(props.bold && {
        fontWeight: '700',
        fontFamily: 'Quicksand-Bold',
      }),
    },
  }),
  Button: (props) => ({
    radius: 999,
    containerStyle: {
      alignItems: props.fullWidth ? 'stretch' : 'center',
    },
    titleStyle: {
      fontFamily: 'Quicksand-Medium',
      fontWeight: '500',
      fontSize: 14.22,
      letterSpacing: 1.25,
    },
    size: 'lg',
    uppercase: true,
  }),
  lightColors,
  darkColors,
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
