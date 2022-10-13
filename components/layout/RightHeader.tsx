import { Icon, useTheme } from '@rneui/themed';
import React, { useContext } from 'react';

import border from '../../styles/border';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
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
      containerStyle={[spacing.mr_lg, border.rounded, layout.aspectRatioSquare]}
      color={theme.colors.black}
      underlayColor={theme.colors.primary}
    />
  );
}

export default RightHeader;
