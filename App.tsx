import { ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import NavigationContainer from './components/NavigationContainer';
import { myTheme } from './theme';

import { ThemeModeProvider } from './theme/ThemeModeContext';

import Routes from './routes/Routes';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Inter: Inter_400Regular,
          'Inter-Medium': Inter_500Medium,
          'Inter-Semibold': Inter_600SemiBold,
          'Inter-Bold': Inter_700Bold,
          'Inter-ExtraBold': Inter_800ExtraBold,
        });
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
            <Routes />
          </NavigationContainer>
        </ThemeModeProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
