import { Icon, useTheme } from '@rneui/themed';
import React, { useContext } from 'react';

import spacing from '../../theme/spacing';
import { BORDER_RADIUS } from '../../theme/theme';
import { ThemeModeContext } from '../../utils/context/ThemeModeContext';

function RightHeader() {
  const { theme } = useTheme();
  const { isDarkMode, setThemeMode } = useContext(ThemeModeContext);

  const toggleThemeMode = () => {
    setThemeMode(isDarkMode ? 'light' : 'dark');
  };

  return (
    <Icon
      name={isDarkMode ? 'moon-outline' : 'sunny-outline'}
      type="ionicon"
      onPress={toggleThemeMode}
      containerStyle={[
        spacing.mr_lg,
        {
          borderRadius: BORDER_RADIUS.rounded,
          aspectRatio: 1,
        },
      ]}
      color={theme.colors.black}
      underlayColor={theme.colors.primary}
    />
  );
}

export default RightHeader;
