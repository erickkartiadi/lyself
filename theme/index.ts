import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';
import { ButtonProps, createTheme, TextProps } from '@rneui/themed';

import {
  BORDER_RADIUS,
  darkColors,
  FONT,
  GUTTER_SIZE,
  lightColors,
  THEME_SPACING,
} from './theme';

const myTheme = createTheme({
  spacing: { ...THEME_SPACING },
  lightColors,
  darkColors,
  components: {
    Input: () => ({
      labelStyle: FONT.subtitle,
      inputStyle: FONT.regular,
      inputContainerStyle: {
        borderBottomWidth: 1,
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
      style: [FONT.regular],
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
    Icon: {
      containerStyle: { aspectRatio: 1 },
    },
    Text: (props: TextProps) => ({
      h1Style: [FONT.heading1],
      h2Style: [FONT.heading2],
      h3Style: [FONT.heading3],
      h4Style: [FONT.heading4],
      style: [
        FONT.regular,
        props.subtitle && FONT.subtitle,
        props.subtitle2 && FONT.subtitle2,
        props.subtitle3 && FONT.subtitle3,
        props.small && FONT.small,
        props.caption && FONT.caption,
        { ...(props.color && { color: props.color }) },
      ],
    }),

    Button: (props: ButtonProps) => ({
      radius: BORDER_RADIUS.rounded,
      titleStyle: [FONT.subtitle3],
      size: 'lg',
      uppercase: true,
    }),
    FAB: {
      titleStyle: [FONT.subtitle3],
    },
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
    Chip: {
      titleStyle: [FONT.subtitle3],
    },
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

export { myTheme, navThemeDark, navThemeLight };
