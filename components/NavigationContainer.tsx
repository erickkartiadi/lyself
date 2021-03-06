import { NavigationContainer as Container } from '@react-navigation/native';
import React, { PropsWithChildren, ReactNode, useContext } from 'react';
import * as Linking from 'expo-linking';
import { navThemeDark, navThemeLight } from '../theme';
import { ThemeModeContext } from '../theme/ThemeModeContext';

const prefix = Linking.createURL('/');

function NavigationContainer({
  children,
}: PropsWithChildren<{ children: ReactNode }>) {
  const linking = {
    prefixes: [prefix],
  };
  const { isDarkMode } = useContext(ThemeModeContext);

  return (
    <Container
      linking={linking}
      theme={isDarkMode ? navThemeDark : navThemeLight}
    >
      {children}
    </Container>
  );
}

export default NavigationContainer;
