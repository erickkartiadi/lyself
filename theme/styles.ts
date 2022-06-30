import { themeSpacing } from '@rneui/themed/dist/config/ThemeProvider';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: themeSpacing.lg,
  },
  noContainerOffset: {
    marginHorizontal: themeSpacing.lg * -1,
  },
  containerSection: {
    paddingHorizontal: themeSpacing.lg,
    paddingVertical: themeSpacing.xl,
  },
});

export default styles;