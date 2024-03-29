import { makeStyles } from '@rneui/themed';

// for styles that use the dynamic theme object
const useStyles = makeStyles((theme) => ({
  textBlue: {
    color: theme.colors.blue,
  },
  textPrimary: {
    color: theme.colors.primary,
  },
  textBlack: {
    color: theme.colors.black,
  },
  textWhite: {
    color: theme.colors.white,
  },
  textGreyDarker: {
    color: theme.colors.grey1,
  },
  textWarning: {
    color: theme.colors.warning,
  },
  textGrey: {
    color: theme.colors.grey3,
  },
  textGreyLighter: {
    color: theme.colors.grey5,
  },
  textError: {
    color: theme.colors.error,
  },

  // backgroundColor
  defaultBackground: {
    backgroundColor: theme.colors.background,
  },
  cardBackground: {
    backgroundColor: theme.colors.cardBackground,
  },
  secondaryBackground: {
    backgroundColor: theme.colors.secondary,
  },

  // border
  borderPrimary: {
    borderColor: theme.colors.primary,
  },
  borderGrey3: {
    borderColor: theme.colors.grey3,
  },
  borderGrey5: {
    borderColor: theme.colors.grey5,
  },
}));

export default useStyles;
