import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';
import { createTheme, TextProps } from '@rneui/themed';

import border from '../styles/border';
import layout from '../styles/layout';
import spacing from '../styles/spacing';
import {
  caption,
  heading1,
  heading2,
  heading3,
  heading4,
  regular,
  small,
  subtitle,
  subtitle2,
  subtitle3,
} from '../styles/typhography';
import { BORDER_RADIUS, darkColors, lightColors, SPACES } from './theme';

const myTheme = createTheme({
  spacing: SPACES,
  lightColors,
  darkColors,
  components: {
    Input: () => ({
      labelStyle: subtitle,
      inputStyle: regular,
      inputContainerStyle: border.bottom_width_md,
      containerStyle: spacing.px_0,
    }),
    Card: {
      containerStyle: spacing.m_0,
    },
    SearchBar: {
      style: regular,
      inputStyle: regular,
    },
    Icon: {
      containerStyle: layout.aspectRatioSquare,
    },
    Text: (props: TextProps) => ({
      h1Style: heading1,
      h2Style: heading2,
      h3Style: heading3,
      h4Style: heading4,
      style: [
        regular,
        props.subtitle && subtitle,
        props.subtitle2 && subtitle2,
        props.subtitle3 && subtitle3,
        props.small && small,
        props.caption && caption,
      ],
    }),
    Button: {
      radius: BORDER_RADIUS.rounded,
      titleStyle: subtitle3,
      size: 'lg',
      uppercase: true,
    },
    FAB: {
      titleStyle: subtitle3,
    },
    Chip: {
      titleStyle: subtitle3,
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
