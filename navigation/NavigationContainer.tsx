import { NavigationContainer as Container } from '@react-navigation/native';
import React, { PropsWithChildren, ReactNode, useContext } from 'react';
import * as Linking from 'expo-linking';
import { ThemeModeContext } from '../theme/ThemeModeContext';
import { navThemeDark, navThemeLight } from '../theme';

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
