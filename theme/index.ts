import {
  ButtonProps,
  CreateThemeOptions,
  TextProps,
  createTheme,
} from '@rneui/themed';
import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';
import { FONT_SIZE, THEME_SPACING } from './styles';

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
  spacing: { ...THEME_SPACING },
  components: {
    Input: () => ({
      labelStyle: {
        fontSize: FONT_SIZE.body2,
        fontFamily: 'Quicksand-Medium',
        fontWeight: '500',
        letterSpacing: 0.1,
        marginBottom: THEME_SPACING.xs,
      },
      inputStyle: {
        fontFamily: 'Quicksand',
        fontSize: FONT_SIZE.body1,
      },
      inputContainerStyle: {
        borderBottomWidth: 0.75,
      },
      containerStyle: { paddingHorizontal: 0 },
    }),
    Card: {
      containerStyle: {
        margin: 0,
        padding: THEME_SPACING.lg,
        marginTop: THEME_SPACING.md,
        marginBottom: THEME_SPACING.md,
      },
    },
    SearchBar: {
      style: {
        fontFamily: 'Quicksand',
      },
      inputStyle: {
        fontSize: FONT_SIZE.body2,
      },
    },
    CheckBox: {
      fontFamily: 'Quicksand-Medium',
      textStyle: { fontWeight: '500', marginTop: -4 },
      containerStyle: {
        padding: 0,
        marginLeft: 0,
        paddingVertical: THEME_SPACING.md,
      },
    },
    Text: (props: TextProps) => ({
      h1Style: {
        fontSize: FONT_SIZE.heading1,
        fontFamily: 'Quicksand-Medium',
        fontWeight: '500',
        letterSpacing: -0.75,
        marginBottom: THEME_SPACING.md,
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
        fontSize: FONT_SIZE.heading2,
        fontFamily: 'Quicksand-Medium',
        fontWeight: '500',
        marginBottom: THEME_SPACING.md,
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
        fontSize: FONT_SIZE.heading3,
        fontFamily: 'Quicksand-Medium',
        fontWeight: '500',
        marginBottom: THEME_SPACING.sm,
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
        fontSize: FONT_SIZE.heading4,
        fontFamily: 'Quicksand-Medium',
        fontWeight: '500',
        marginBottom: THEME_SPACING.sm,
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
          fontSize: FONT_SIZE.body1,
          fontFamily: 'Quicksand',
          fontWeight: '400',
          letterSpacing: 0.5,
        },
        ...(props.subtitle1 && {
          fontSize: FONT_SIZE.body1,
          fontFamily: 'Quicksand-Medium',
          fontWeight: '500',
          letterSpacing: 0.25,
          marginBottom: THEME_SPACING.xs,
        }),
        ...(props.subtitle2 && {
          fontSize: FONT_SIZE.body2,
          fontFamily: 'Quicksand-Medium',
          fontWeight: '500',
          letterSpacing: 0.125,
          marginBottom: THEME_SPACING.xs,
        }),
        ...(props.caption && {
          fontSize: FONT_SIZE.caption,
          fontFamily: 'Quicksand',
          fontWeight: '400',
          letterSpacing: 0.4,
          marginBottom: THEME_SPACING.xs,
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
        fontSize: FONT_SIZE.body2,
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
