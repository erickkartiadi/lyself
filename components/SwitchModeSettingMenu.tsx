import { Switch, useTheme } from '@rneui/themed';
import React, { useContext, useEffect, useState } from 'react';

import { ThemeModeContext } from '../theme/ThemeModeContext';
import SettingMenu from './SettingMenu';

function ThemeSwitch() {
  const { isDarkMode, setThemeMode } = useContext(ThemeModeContext);
  const [isOn, setIsOn] = useState(isDarkMode);

  useEffect(() => {
    setIsOn(isDarkMode);
  }, [isDarkMode]);

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
      bgColor={theme.colors.yellow}
      bgColorDark={theme.colors.purple}
      iconName={isDarkMode ? 'moon' : 'sunny'}
      iconType="ionicon"
      rightComponent={<ThemeSwitch />}
    />
  );
}

export default SwitchModeSettingMenu;
