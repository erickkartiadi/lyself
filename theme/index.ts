import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';
import { ButtonProps, createTheme, normalize, TextProps } from '@rneui/themed';

import {
  BORDER_RADIUS,
  FONT,
  FONT_FAMILY,
  FONT_SIZE,
  GUTTER_SIZE,
  THEME_SPACING,
} from './styles';

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

const myTheme = createTheme({
  spacing: { ...THEME_SPACING },
  lightColors,
  darkColors,
  components: {
    Input: () => ({
      labelStyle: FONT.subtitle,
      inputStyle: FONT.regular,
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
      },
    },
    SearchBar: {
      style: [FONT.small],
      inputStyle: FONT.regular,
    },
    CheckBox: {
      textStyle: [
        FONT.small,
        {
          // vertically align text with checkbox icon
          marginTop: THEME_SPACING.sm * -1,
        },
      ],
      containerStyle: {
        padding: 0,
        marginLeft: 0,
        paddingVertical: THEME_SPACING.md,
      },
    },
    Text: (props: TextProps) => ({
      h1Style: [
        FONT.heading1,
        {
          marginBottom: THEME_SPACING.sm,
        },
      ],
      h2Style: [
        FONT.heading2,
        {
          marginBottom: THEME_SPACING.sm,
        },
      ],
      h3Style: [
        FONT.heading3,
        {
          marginBottom: THEME_SPACING.sm,
        },
      ],
      h4Style: [
        FONT.heading4,
        {
          marginBottom: THEME_SPACING.sm,
        },
      ],
      style: [
        FONT.regular,
        props.subtitle && FONT.subtitle,
        props.small && FONT.small,
        props.caption && FONT.caption,
      ],
    }),
    Button: (props: ButtonProps) => ({
      radius: BORDER_RADIUS.rounded,
      containerStyle: {
        alignItems: props.fullWidth ? 'stretch' : 'center',
      },
      titleStyle: {
        fontFamily: FONT_FAMILY.medium,
        fontWeight: '500',
        fontSize: props.size === 'lg' ? FONT_SIZE.body2 : FONT_SIZE.caption,
        letterSpacing: normalize(props.size === 'lg' ? 1.25 : 0.25),
      },
      size: 'lg',
      uppercase: true,
    }),
    Dialog: {
      overlayStyle: {
        borderRadius: BORDER_RADIUS.md,
      },
    },
    DialogButton: {
      size: 'md',
      radius: BORDER_RADIUS.rounded,
      titleStyle: FONT.caption,
    },
    DialogTitle: {
      titleProps: {
        style: [
          FONT.heading4,
          {
            marginBottom: THEME_SPACING.md,
          },
        ],
      },
    },
    Tab: {
      variant: 'primary',
      containerStyle: {
        padding: THEME_SPACING.md,
        borderRadius: BORDER_RADIUS.rounded,
        margin: GUTTER_SIZE,
      },
    },
    TabItem: {
      containerStyle: {
        borderRadius: BORDER_RADIUS.rounded,
      },
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
    card: myTheme.darkColors?.background as string,
    border: myTheme.darkColors?.grey4 as string,
    notification: myTheme.darkColors?.error as string,
  },
};

export { myTheme, navThemeDark, navThemeLight };
