import { ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useCallback, useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import NavigationContainer from './components/atoms/NavigationContainer';
import { myTheme } from './theme';
import { ThemeModeProvider } from './theme/ThemeModeContext';
import RootRoutes from './routes/Root.routes';
import { customFont } from './theme/styles';

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
            <RootRoutes />
          </NavigationContainer>
        </ThemeModeProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
