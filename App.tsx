import { ThemeProvider } from '@rneui/themed';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import NavigationContainer from './components/NavigationContainer';
import RootNavigator from './navigation/RootNavigator.routing';
import { myTheme } from './theme';
import { customFont } from './theme/styles';
import { ThemeModeProvider } from './theme/ThemeModeContext';
import toastConfig from './theme/toastConfig';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(customFont);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme={myTheme}>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <ThemeModeProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
          <Toast config={toastConfig} />
        </ThemeModeProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
