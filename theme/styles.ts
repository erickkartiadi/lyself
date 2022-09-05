import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { lightColors, normalize } from '@rneui/themed';
import colorAlpha from 'color-alpha';
import { StyleSheet } from 'react-native';

const THEME_SPACING = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};

const BORDER_RADIUS = {
  rounded: 999,
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
  shadow: {
    shadowColor: colorAlpha(lightColors.black, 0.25),
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  shadowMedium: {
    shadowColor: colorAlpha(lightColors.black, 0.25),
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

// for loading custom fonts: App.tsx
const customFont = {
  [FONT_FAMILY.regular]: Inter_400Regular,
  [FONT_FAMILY.medium]: Inter_500Medium,
  [FONT_FAMILY.bold]: Inter_700Bold,
};

export {
  BORDER_RADIUS,
  customFont,
  FONT_FAMILY,
  FONT_SIZE,
  GUTTER_SIZE,
  styles,
  THEME_SPACING,
};
