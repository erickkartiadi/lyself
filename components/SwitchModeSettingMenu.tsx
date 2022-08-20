import { Switch, useTheme } from '@rneui/themed';
import React, { useContext, useState } from 'react';
import { ThemeModeContext } from '../theme/ThemeModeContext';
import SettingMenu from './SettingMenu';

function ThemeSwitch() {
  const { theme } = useTheme();
  const { isDarkMode, setThemeMode } = useContext(ThemeModeContext);
  const [isOn, setIsOn] = useState(isDarkMode);

  const handleSwitchThemeMode = (value: boolean) => {
    setThemeMode(value ? 'dark' : 'light');
    setIsOn(value);
  };

  return (
    <Switch
      color={theme.colors.grey2}
      value={isOn}
      onValueChange={handleSwitchThemeMode}
    />
  );
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
