import { StyleSheet } from 'react-native';

import { FONT_FAMILY, FONT_SIZE } from '../theme/theme';
import normalize from '../utils/normalize';

export const text = StyleSheet.create({
  decor_line_none: {
    textDecorationLine: 'none',
  },
  center: {
    textAlign: 'center',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
});

// Inter Dynamic Metrics: https://rsms.me/inter/dynmetrics/
export const font = StyleSheet.create({
  size_3xl: {
    fontSize: FONT_SIZE.heading1,
    letterSpacing: normalize(-0.019),
    lineHeight: normalize(34),
  },
  size_2xl: {
    fontSize: FONT_SIZE.heading2,
    letterSpacing: normalize(-0.018),
    lineHeight: normalize(30),
  },
  size_xl: {
    fontSize: FONT_SIZE.heading3,
    letterSpacing: normalize(-0.017),
    lineHeight: normalize(28),
  },
  size_lg: {
    fontSize: FONT_SIZE.heading4,
    letterSpacing: normalize(-0.014),
    lineHeight: normalize(25),
  },
  size_md: {
    fontSize: FONT_SIZE.body1,
    letterSpacing: normalize(-0.011),
    lineHeight: normalize(22),
  },
  size_sm: {
    fontSize: FONT_SIZE.body2,
    letterSpacing: normalize(-0.006),
    lineHeight: normalize(20),
  },
  size_xs: {
    fontSize: FONT_SIZE.caption,
    lineHeight: normalize(17),
    letterSpacing: normalize(0),
  },
  weight_normal: {
    fontFamily: FONT_FAMILY.regular,
    fontWeight: 'normal',
  },
  weight_md: {
    fontFamily: FONT_FAMILY.medium,
    fontWeight: 'normal',
  },
  weight_bold: {
    fontFamily: FONT_FAMILY.bold,
    fontWeight: 'normal',
  },
});

export const heading1 = StyleSheet.flatten([font.size_3xl, font.weight_bold]);
export const heading2 = StyleSheet.flatten([font.size_2xl, font.weight_bold]);
export const heading3 = StyleSheet.flatten([font.size_xl, font.weight_bold]);
export const heading4 = StyleSheet.flatten([font.size_lg, font.weight_bold]);
export const subtitle = StyleSheet.flatten([font.size_lg, font.weight_md]);
export const subtitle2 = StyleSheet.flatten([font.size_md, font.weight_md]);
export const subtitle3 = StyleSheet.flatten([font.size_sm, font.weight_md]);
export const regular = StyleSheet.flatten([font.size_md, font.weight_normal]);
export const small = StyleSheet.flatten([font.size_sm, font.weight_normal]);
export const caption = StyleSheet.flatten([font.size_xs, font.weight_normal]);
