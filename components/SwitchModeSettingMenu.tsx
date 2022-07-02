import { Switch, useTheme, useThemeMode } from '@rneui/themed';
import React, { useContext, useState } from 'react';
import { PreferencesContext } from '../theme/PreferencesContext';
import SettingMenu from './SettingMenu';

function ThemeSwitch() {
  const { theme } = useTheme();
  const { theme: preferences, setPreferences } = useContext(PreferencesContext);
  const [isDarkMode, setIsDarkMode] = useState(preferences === 'dark');

  const handleSwitchThemeMode = (value: boolean) => {
    setIsDarkMode(value);
    setPreferences(isDarkMode ? 'light' : 'dark');
  };
  return (
    <Switch
      color={theme.colors.grey1}
      value={isDarkMode}
      onValueChange={handleSwitchThemeMode}
    />
  );
}

function SwitchModeSettingMenu() {
  const { theme } = useTheme();
  const { mode } = useThemeMode();

  return (
    <SettingMenu
      title={mode === 'light' ? 'Light mode' : 'Dark mode'}
      bgColor={theme.colors.yellow}
      bgColorDark={theme.colors.purple}
      iconName={mode === 'dark' ? 'moon' : 'sunny'}
      iconType="ionicon"
      rightComponent={<ThemeSwitch />}
    />
  );
}

export default SwitchModeSettingMenu;
