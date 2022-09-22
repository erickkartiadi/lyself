import { ThemeProvider } from '@rneui/themed';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import RootNavigator from './navigation/RootNavigator.routing';
import loadAxiosInterceptor from './services/axios/axios';
import { myTheme } from './theme';
import { customFont } from './theme/styles';
import toastConfig from './theme/toastConfig';
import { AuthProvider } from './utils/context/AuthContext';
import { ThemeModeProvider } from './utils/context/ThemeModeContext';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(customFont);
        loadAxiosInterceptor();
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
    <AuthProvider>
      <ThemeProvider theme={myTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider onLayout={onLayoutRootView}>
            <ThemeModeProvider>
              <RootNavigator />
              <Toast config={toastConfig} />
            </ThemeModeProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </AuthProvider>
  );
}
