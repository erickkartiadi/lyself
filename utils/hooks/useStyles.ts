import { makeStyles } from '@rneui/themed';

// for styles that use the dynamic theme object
const useStyles = makeStyles((theme) => ({
  textPrimary: {
    color: theme.colors.primary,
  },
  textWhite: {
    color: theme.colors.white,
  },
  textBlack: {
    color: theme.colors.black,
  },
  textGrey: {
    color: theme.colors.grey3,
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
  borderGrey3: {
    borderColor: theme.colors.grey3,
  },
  borderGrey5: {
    borderColor: theme.colors.grey5,
  },
}));

export default useStyles;
