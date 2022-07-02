import { NavigationContainer as RNENavigationContainer } from '@react-navigation/native';
import React, { PropsWithChildren, ReactNode, useContext } from 'react';
import * as Linking from 'expo-linking';
import { navThemeDark, navThemeLight } from '../theme';
import { PreferencesContext } from '../theme/PreferencesContext';

const prefix = Linking.createURL('/');

function NavigationContainer({
  children,
}: PropsWithChildren<{ children: ReactNode }>) {
  const linking = {
    prefixes: [prefix],
  };
  const { theme } = useContext(PreferencesContext);

  return (
    <RNENavigationContainer
      linking={linking}
      theme={theme === 'light' ? navThemeLight : navThemeDark}
    >
      {children}
    </RNENavigationContainer>
  );
}

export default NavigationContainer;
