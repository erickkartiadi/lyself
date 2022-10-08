import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { StyleProp, TextStyle } from 'react-native';

import normalize from '../utils/normalize';

export const lightColors = {
  primary: '#F55C7A',
  primaryDark: '#D0385C',
  secondary: '#E8EDF2',
  background: '#FBFCFD',
  cardBackground: '#FFFFFF',
  searchBg: '#E8EDF2',
  yellow: '#F8E596',
  yellowDark: '#CBA50D',
  blueLight: '#80D0FF',
  blue: '#00A3FF',
  green: '#3BA71B',
  greenLight: '#92E977',
  purple: '#9C5FAE',
  spotify: '#1db954',
  google: '#ea4335',
  facebook: '#1877f2',
  apple: '#000000',
};

export const darkColors = {
  primary: '#EF617E',
  primaryDark: '#F38399',
  secondary: '#303337',
  searchBg: '#303337',
  yellow: '#CBA50D',
  yellowDark: '#F8E596',
  background: '#121212',
  cardBackground: '#191B1C',
  green: '#92E977',
  greenLight: '#3BA71B',
  blue: '#80D0FF',
  blueLight: '#00A3FF',
  purple: '#9454A7',
  spotify: '#1BAC4E',
  google: '#E83221',
  facebook: '#0E6DE9',
  apple: '#FFFFFF',
};

export const THEME_SPACING = {
  xs: normalize(4),
  sm: normalize(6),
  md: normalize(8),
  lg: normalize(12),
  xl: normalize(16),
};

export const BORDER_RADIUS = {
  rounded: normalize(999),
  sm: THEME_SPACING.sm,
  md: THEME_SPACING.md,
  lg: THEME_SPACING.lg,
  xl: THEME_SPACING.xl,
};

export const GUTTER_SIZE = THEME_SPACING.xl;

// scale: 1.125 - major second
export const FONT_SIZE = {
  heading1: normalize(25.23),
  heading2: normalize(22.43),
  heading3: normalize(19.93),
  heading4: normalize(17.72),
  body1: normalize(15.75),
  body2: normalize(14),
  caption: normalize(12.44),
};

// for fontFamily theme styling or component that can't use theme font
export const FONT_FAMILY = {
  regular: 'Inter',
  medium: 'Inter-Medium',
  bold: 'Inter-Bold',
};

export type Font =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'subtitle'
  | 'subtitle2'
  | 'subtitle3'
  | 'regular'
  | 'small'
  | 'caption';

export const FONT: { [key in Font]: StyleProp<TextStyle> } = {
  heading1: {
    fontSize: FONT_SIZE.heading1,
    letterSpacing: normalize(-0.019),
    lineHeight: normalize(34),
    fontFamily: FONT_FAMILY.bold,
    fontWeight: 'normal',
  },
  heading2: {
    fontSize: FONT_SIZE.heading2,
    letterSpacing: normalize(-0.018),
    lineHeight: normalize(30),
    fontFamily: FONT_FAMILY.bold,
    fontWeight: 'normal',
  },
  heading3: {
    fontSize: FONT_SIZE.heading3,
    letterSpacing: normalize(-0.017),
    lineHeight: normalize(28),
    fontFamily: FONT_FAMILY.bold,
    fontWeight: 'normal',
  },
  heading4: {
    fontSize: FONT_SIZE.heading4,
    letterSpacing: normalize(-0.014),
    lineHeight: normalize(25),
    fontFamily: FONT_FAMILY.bold,
    fontWeight: 'normal',
  },
  subtitle: {
    fontSize: FONT_SIZE.heading4,
    letterSpacing: normalize(-0.014),
    lineHeight: normalize(25),
    fontFamily: FONT_FAMILY.medium,
    fontWeight: 'normal',
  },
  subtitle2: {
    fontSize: FONT_SIZE.body1,
    letterSpacing: normalize(-0.006),
    lineHeight: normalize(20),
    fontFamily: FONT_FAMILY.medium,
    fontWeight: 'normal',
  },
  subtitle3: {
    fontSize: FONT_SIZE.caption,
    letterSpacing: normalize(-0.006),
    lineHeight: normalize(20),
    fontFamily: FONT_FAMILY.medium,
    fontWeight: 'normal',
  },
  regular: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.body1,
    letterSpacing: normalize(-0.011),
    lineHeight: normalize(22),
    fontWeight: 'normal',
  },
  small: {
    fontSize: FONT_SIZE.body2,
    letterSpacing: normalize(-0.006),
    lineHeight: normalize(20),
    fontFamily: FONT_FAMILY.regular,
    fontWeight: 'normal',
  },
  caption: {
    fontSize: FONT_SIZE.caption,
    fontFamily: FONT_FAMILY.regular,
    lineHeight: normalize(17),
    letterSpacing: normalize(0),
    fontWeight: 'normal',
  },
};

// for loading custom fonts: App.tsx
export const customFont = {
  [FONT_FAMILY.regular]: Inter_400Regular,
  [FONT_FAMILY.medium]: Inter_500Medium,
  [FONT_FAMILY.bold]: Inter_700Bold,
};
