import { NavigationContainer as Container } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import React, { PropsWithChildren, useContext } from 'react';

import { navThemeDark, navThemeLight } from '../theme';
import { ThemeModeContext } from '../theme/ThemeModeContext';

const prefix = Linking.createURL('/');

function NavigationContainer({ children }: PropsWithChildren) {
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
