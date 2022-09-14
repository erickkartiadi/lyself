import { Switch, useTheme } from '@rneui/themed';
import React, { useContext } from 'react';

import { ThemeModeContext } from '../context/ThemeModeContext';
import SettingMenu from './SettingMenu';

function SwitchModeSettingMenu() {
  const { isDarkMode, setThemeMode } = useContext(ThemeModeContext);

  const toggleThemeMode = () => {
    setThemeMode(isDarkMode ? 'light' : 'dark');
  };

  const { theme } = useTheme();

  return (
    <SettingMenu
      title={isDarkMode ? 'Dark mode' : 'Light mode'}
      backgroundColor={isDarkMode ? theme.colors.purple : theme.colors.yellow}
      name={isDarkMode ? 'moon' : 'sunny'}
      type="ionicon"
      onPress={toggleThemeMode}
      rightComponent={<Switch value={isDarkMode} onValueChange={toggleThemeMode} />}
    />
  );
}

export default SwitchModeSettingMenu;
