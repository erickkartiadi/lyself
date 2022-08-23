import {
  ButtonProps,
  CreateThemeOptions,
  TextProps,
  createTheme,
  normalize,
} from '@rneui/themed';
import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const themeSpacing = {
  xs: 2,
  sm: 4,
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
    marginTop: themeSpacing.lg,
    marginBottom: themeSpacing.lg,
  },
  containerSectionVerticalDistance: {
    marginVertical: themeSpacing.lg,
  },
  flatList: {
    paddingHorizontal: themeSpacing.xl,
    paddingBottom: themeSpacing.xl,
  },
  flatListContainer: {
    // remove container offset
    marginHorizontal: themeSpacing.xl * -1,

    // remove FlatList padding bottom
    marginBottom: themeSpacing.xl * -1,
  },
});

// scale: 1.125 - major second
const fontSize = {
  heading1: normalize(25.63),
  heading2: normalize(22.78),
  heading3: normalize(20.25),
  heading4: normalize(18),
  body1: normalize(16),
  body2: normalize(14.22),
  caption: normalize(12.64),
};

const lightColors = {
  primary: '#f55c7a',
  primaryLight: '#ff8fa9',
  primaryDark: '#bd244e',
  secondary: '#5C7BF5',
  secondaryLight: '#94aaff',
  secondaryDark: '#0850c1',
  purple: '#8a5cf5',
  yellow: '#f3b700',
  blue: '#35A7FF',
  error: '#E61025',
  background: '#FBFBFB',
  cardBackground: '#FFFFFF',
  brand: {
    spotify: {
      green: '#1db954',
    },
    google: {
      red: '#ea4335',
    },
    facebook: {
      blue: '#1877f2',
    },
    apple: {
      black: '#000000',
    },
  },
};

const darkColors = {
  primary: '#EF617E',
  primaryLight: '#bd244e',
  primaryDark: '#ff8fa9',
  secondary: '#617EEF',
  secondaryLight: '#0850c1',
  secondaryDark: '#94aaff',
  purple: '#8C61EF',
  yellow: '#ECB309',
  blue: '#3AA6F8',
  error: '#BF3644',
  background: '#141414',
  cardBackground: '#1D1D1D',
  brand: {
    spotify: {
      green: '#23B455',
    },
    google: {
      red: '#E3483A',
    },
    facebook: {
      blue: '#1F77EA',
    },
    apple: {
      black: '#FFFFFF',
    },
  },
};

const myTheme: CreateThemeOptions = createTheme({
  spacing: { ...themeSpacing },
  components: {
    Input: () => ({
      labelStyle: {
        fontSize: fontSize.body2,
        fontFamily: 'Quicksand-Medium',
        fontWeight: '500',
        letterSpacing: 0.1,
        marginBottom: themeSpacing.xs,
      },
      inputStyle: {
        fontFamily: 'Quicksand',
        fontSize: fontSize.body1,
      },
      inputContainerStyle: {
        borderBottomWidth: 0.75,
      },
      containerStyle: { paddingHorizontal: 0 },
    }),
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
        fontSize: fontSize.body2,
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
    Text: (props: TextProps) => ({
      h1Style: {
        fontSize: fontSize.heading1,
        fontFamily: 'Quicksand-Medium',
        fontWeight: '500',
        letterSpacing: -0.75,
        marginBottom: themeSpacing.md,
        ...(props.medium && {
          fontFamily: 'Quicksand-Medium',
          fontWeight: '500',
        }),
        ...(props.bold && {
          fontFamily: 'Quicksand-Bold',
          fontWeight: 'normal',
        }),
      },
      h2Style: {
        fontSize: fontSize.heading2,
        fontFamily: 'Quicksand-Medium',
        fontWeight: '500',
        marginBottom: themeSpacing.md,
        letterSpacing: -0.25,
        ...(props.medium && {
          fontFamily: 'Quicksand-Medium',
          fontWeight: '500',
        }),
        ...(props.bold && {
          fontFamily: 'Quicksand-Bold',
          fontWeight: 'normal',
        }),
      },
      h3Style: {
        fontSize: fontSize.heading3,
        fontFamily: 'Quicksand-Medium',
        fontWeight: '500',
        marginBottom: themeSpacing.sm,
        letterSpacing: 0,
        ...(props.medium && {
          fontFamily: 'Quicksand-Medium',
          fontWeight: '500',
        }),
        ...(props.bold && {
          fontFamily: 'Quicksand-Bold',
          fontWeight: 'normal',
        }),
      },
      h4Style: {
        fontSize: fontSize.heading4,
        fontFamily: 'Quicksand-Medium',
        fontWeight: '500',
        marginBottom: themeSpacing.sm,
        letterSpacing: 0.125,
        ...(props.medium && {
          fontFamily: 'Quicksand-Medium',
          fontWeight: '500',
        }),
        ...(props.bold && {
          fontFamily: 'Quicksand-Bold',
          fontWeight: 'normal',
        }),
      },
      style: {
        // default
        ...{
          fontSize: fontSize.body1,
          fontFamily: 'Quicksand',
          fontWeight: '400',
          letterSpacing: 0.5,
        },
        ...(props.subtitle1 && {
          fontSize: fontSize.body1,
          fontFamily: 'Quicksand-Medium',
          fontWeight: '500',
          letterSpacing: 0.25,
          marginBottom: themeSpacing.xs,
        }),
        ...(props.subtitle2 && {
          fontSize: fontSize.body2,
          fontFamily: 'Quicksand-Medium',
          fontWeight: '500',
          letterSpacing: 0.125,
          marginBottom: themeSpacing.xs,
        }),
        ...(props.caption && {
          fontSize: fontSize.caption,
          fontFamily: 'Quicksand',
          fontWeight: '400',
          letterSpacing: 0.4,
          marginBottom: themeSpacing.xs,
        }),
        ...(props.medium && {
          fontFamily: 'Quicksand-Medium',
          fontWeight: '500',
        }),
        ...(props.bold && {
          fontFamily: 'Quicksand-Bold',
          fontWeight: 'normal',
        }),
      },
    }),
    Button: (props: ButtonProps) => ({
      radius: 100,
      containerStyle: {
        alignItems: props.fullWidth ? 'stretch' : 'center',
      },
      titleStyle: {
        fontFamily: 'Quicksand-Medium',
        fontWeight: '500',
        fontSize: fontSize.body2,
        letterSpacing: 1.25,
      },
      size: 'lg',
      uppercase: true,
    }),
  },
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
    card: myTheme.darkColors?.background as string,
    border: myTheme.darkColors?.grey4 as string,
    notification: myTheme.darkColors?.error as string,
  },
};

export { myTheme, navThemeLight, navThemeDark };
