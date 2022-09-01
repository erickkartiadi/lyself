import { Switch, useTheme } from '@rneui/themed';
import React, { useContext, useEffect } from 'react';

import { ThemeModeContext } from '../theme/ThemeModeContext';
import SettingMenu from './SettingMenu';

function ThemeSwitch() {
  const { isDarkMode, setThemeMode } = useContext(ThemeModeContext);

  useEffect(() => {}, [isDarkMode]);

  const toggleThemeMode = () => {
    setThemeMode(isDarkMode ? 'light' : 'dark');
  };

  return <Switch value={isDarkMode} onValueChange={toggleThemeMode} />;
}

function SwitchModeSettingMenu() {
  const { theme } = useTheme();
  const { isDarkMode } = useContext(ThemeModeContext);

  return (
    <SettingMenu
      title={isDarkMode ? 'Dark mode' : 'Light mode'}
      backgroundColor={isDarkMode ? theme.colors.purple : theme.colors.yellow}
      name={isDarkMode ? 'moon' : 'sunny'}
      type="ionicon"
      rightComponent={<ThemeSwitch />}
    />
  );
}

export default SwitchModeSettingMenu;
