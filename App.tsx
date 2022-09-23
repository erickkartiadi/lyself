import { ThemeProvider } from '@rneui/themed';
import { focusManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { AppStateStatus, Platform } from 'react-native';
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
import useAppState from './utils/hooks/useAppState';
import useOnlineManager from './utils/hooks/useOnlineManager';

// refetch on focus
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

export default function App() {
  useOnlineManager();
  useAppState(onAppStateChange);

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

  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <ThemeProvider theme={myTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider onLayout={onLayoutRootView}>
            <ThemeModeProvider>
              <QueryClientProvider client={queryClient}>
                <RootNavigator />
              </QueryClientProvider>
              <Toast config={toastConfig} />
            </ThemeModeProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </AuthProvider>
  );
}
