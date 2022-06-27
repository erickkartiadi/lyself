import { NavigationContainer as RNENavigationContainer } from '@react-navigation/native';
import React, { PropsWithChildren, ReactNode, useContext } from 'react';
import { navThemeDark, navThemeLight } from '../theme';
import { PreferencesContext } from '../theme/PreferencesContext';

function NavigationContainer({
  children,
}: PropsWithChildren<{ children: ReactNode }>) {
  const { theme } = useContext(PreferencesContext);

  return (
    <RNENavigationContainer
      theme={theme === 'light' ? navThemeLight : navThemeDark}
    >
      {children}
    </RNENavigationContainer>
  );
}

export default NavigationContainer;
