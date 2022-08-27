import { ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useCallback, useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import NavigationContainer from './components/atoms/NavigationContainer';
import { myTheme } from './theme';

import { ThemeModeProvider } from './theme/ThemeModeContext';
import RootRoutes from './routes/Root.routes';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Quicksand: Quicksand_400Regular,
          'Quicksand-Medium': Quicksand_500Medium,
          'Quicksand-Bold': Quicksand_700Bold,
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
            <RootRoutes />
          </NavigationContainer>
        </ThemeModeProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
