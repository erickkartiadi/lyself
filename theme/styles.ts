import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { lightColors, normalize } from '@rneui/themed';
import colorAlpha from 'color-alpha';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';

const THEME_SPACING = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};

const BORDER_RADIUS = {
  rounded: 999,
  sm: THEME_SPACING.sm,
  md: THEME_SPACING.md,
  lg: THEME_SPACING.lg,
  xl: THEME_SPACING.xl,
};

const GUTTER_SIZE = THEME_SPACING.xl;

const styles = StyleSheet.create({
  containerFluid: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: GUTTER_SIZE,
  },
  containerGutter: {
    paddingHorizontal: GUTTER_SIZE,
  },
  noContainerGutter: {
    marginHorizontal: GUTTER_SIZE * -1,
  },
  section: {
    paddingVertical: THEME_SPACING.xl,
  },
  sectionMedium: {
    paddingVertical: THEME_SPACING.lg,
  },
  sectionSmall: {
    paddingVertical: THEME_SPACING.md,
  },

  // fix flatList shadow cut
  flatListHorizontalContainer: {
    paddingBottom: THEME_SPACING.xl,
  },
  flatListHorizontal: {
    marginBottom: THEME_SPACING.xl * -1,
  },

  // shadow generator -> https://ethercreative.github.io/react-native-shadow-generator/
  shadowLarge: {
    shadowColor: colorAlpha(lightColors.black, 0.5),
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  shadowMedium: {
    shadowColor: colorAlpha(lightColors.black, 0.5),
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  shadowSmall: {
    shadowColor: colorAlpha(lightColors.black, 0.5),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});

// scale: 1.125 - major second
const FONT_SIZE = {
  heading1: normalize(25.63),
  heading2: normalize(22.78),
  heading3: normalize(20.25),
  heading4: normalize(18),
  body1: normalize(16),
  body2: normalize(14.22),
  caption: normalize(12.64),
};

// for fontFamily theme styling or component that can't use theme font
const FONT_FAMILY = {
  regular: 'Inter',
  medium: 'Inter-Medium',
  bold: 'Inter-Bold',
};

const FONT: { [key: string]: StyleProp<TextStyle> } = {
  heading1: {
    fontSize: FONT_SIZE.heading1,
    letterSpacing: normalize(-0.019),
    lineHeight: normalize(34),
    fontFamily: FONT_FAMILY.bold,
    fontWeight: '700',
  },
  heading2: {
    fontSize: FONT_SIZE.heading2,
    letterSpacing: normalize(-0.018),
    lineHeight: normalize(30),
    fontFamily: FONT_FAMILY.bold,
    fontWeight: '700',
  },
  heading3: {
    fontSize: FONT_SIZE.heading3,
    letterSpacing: normalize(-0.017),
    lineHeight: normalize(28),
    fontFamily: FONT_FAMILY.bold,
    fontWeight: '700',
  },
  heading4: {
    fontSize: FONT_SIZE.heading4,
    letterSpacing: normalize(-0.014),
    lineHeight: normalize(25),
    fontFamily: FONT_FAMILY.bold,
    fontWeight: '700',
  },
  regular: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: FONT_SIZE.body1,
    letterSpacing: normalize(-0.011),
    lineHeight: normalize(22),
    fontWeight: '400',
  },
  subtitle: {
    fontSize: FONT_SIZE.body1,
    letterSpacing: normalize(-0.011),
    lineHeight: normalize(22),
    fontFamily: FONT_FAMILY.medium,
    fontWeight: '500',
  },
  subtitle2: {
    fontSize: FONT_SIZE.body2,
    letterSpacing: normalize(-0.006),
    lineHeight: normalize(20),
    fontFamily: FONT_FAMILY.medium,
    fontWeight: '500',
  },
  small: {
    fontSize: FONT_SIZE.body2,
    letterSpacing: normalize(-0.006),
    lineHeight: normalize(20),
    fontFamily: FONT_FAMILY.regular,
    fontWeight: '400',
  },
  caption: {
    fontSize: FONT_SIZE.caption,
    fontFamily: FONT_FAMILY.regular,
    fontWeight: '400',
    lineHeight: normalize(16),
    letterSpacing: normalize(-0.0025),
  },
};

// for loading custom fonts: App.tsx
const customFont = {
  [FONT_FAMILY.regular]: Inter_400Regular,
  [FONT_FAMILY.medium]: Inter_500Medium,
  [FONT_FAMILY.bold]: Inter_700Bold,
};

export {
  BORDER_RADIUS,
  customFont,
  FONT,
  FONT_FAMILY,
  FONT_SIZE,
  GUTTER_SIZE,
  styles,
  THEME_SPACING,
};
