import { StyleSheet } from 'react-native';
import { normalize } from '@rneui/themed';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

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
  scrollViewContainer: {
    paddingHorizontal: GUTTER_SIZE,
  },
  noContainerGutter: {
    marginHorizontal: GUTTER_SIZE * -1,
  },
  section: {
    paddingVertical: THEME_SPACING.xl,
  },

  // fix flatList shadow cut
  flatListHorizontalContainer: {
    paddingBottom: THEME_SPACING.xl,
  },
  flatListHorizontal: {
    marginBottom: THEME_SPACING.xl * -1,
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

// for fontFamily theme styling or component can't use theme font
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
  customFont,
  styles,
  FONT_SIZE,
  THEME_SPACING,
  BORDER_RADIUS,
  GUTTER_SIZE,
  FONT_FAMILY,
};
