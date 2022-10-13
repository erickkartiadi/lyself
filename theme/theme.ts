import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

import normalize from '../utils/normalize';

export const lightColors = {
  primary: '#F55C7A',
  primaryDark: '#D0385C',
  secondary: '#E8EDF2',
  background: '#FBFCFD',
  cardBackground: '#FFFFFF',
  searchBg: '#E8EDF2',
  blue: '#00A3FF',
  blueDark: '#0073B6',
  purple: '#9C5FAE',
  purpleDark: '#724180',
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
  background: '#121212',
  cardBackground: '#191B1C',
  blue: '#0073B6',
  blueDark: '#00A3FF',
  purple: '#724180',
  purpleDark: '#9C5FAE',
  spotify: '#1BAC4E',
  google: '#E83221',
  facebook: '#0E6DE9',
  apple: '#FFFFFF',
};

export const SPACES = {
  xs: normalize(4),
  sm: normalize(6),
  md: normalize(8),
  lg: normalize(12),
  xl: normalize(16),
  '2xl': normalize(20),
};

export const SIZING = {
  ...SPACES,
  '3xl': normalize(24),
  '4xl': normalize(30),
  '5xl': normalize(36),
  '6xl': normalize(48),
  '7xl': normalize(60),
  '8xl': normalize(72),
  '9xl': normalize(96),
  '10xl': normalize(144),
  '11xl': normalize(192),
  '12xl': normalize(288),
  '13xl': normalize(384),
  '14xl': normalize(528),
  '15xl': normalize(672),
};

export const BORDER_RADIUS = {
  rounded: normalize(999),
  xs: SPACES.xs,
  sm: SPACES.sm,
  md: SPACES.md,
  lg: SPACES.lg,
  xl: SPACES.xl,
};

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

export const FONT_FAMILY = {
  regular: 'Inter',
  medium: 'Inter-Medium',
  bold: 'Inter-Bold',
};

// for loading custom fonts: App.tsx
export const customFont = {
  [FONT_FAMILY.regular]: Inter_400Regular,
  [FONT_FAMILY.medium]: Inter_500Medium,
  [FONT_FAMILY.bold]: Inter_700Bold,
};

export const GUTTER_SIZE = SPACES.xl;
