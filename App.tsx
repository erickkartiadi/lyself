import { ThemeProvider } from '@rneui/themed';
import { focusManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { AppStateStatus, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { ErrorToast, InfoToast, SuccessToast } from './components/base/Toast';
import RootNavigator from './navigation/RootNavigator.routing';
import layout from './styles/layout';
import { myTheme } from './theme';
import { customFont } from './theme/theme';
import { AuthProvider } from './utils/context/AuthContext';
import { ThemeModeProvider } from './utils/context/ThemeModeContext';
import useAppState from './utils/hooks/useAppState';
import useOnlineManager from './utils/hooks/useOnlineManager';
import useRegisterNotification from './utils/hooks/useRegisterNotification';

// refetch on focus
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useOnlineManager();
  useAppState(onAppStateChange);
  useRegisterNotification();

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

  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <ThemeProvider theme={myTheme}>
        <GestureHandlerRootView style={layout.flex}>
          <SafeAreaProvider onLayout={onLayoutRootView}>
            <ThemeModeProvider>
              <QueryClientProvider client={queryClient}>
                <RootNavigator />
              </QueryClientProvider>
              <Toast
                config={{
                  success: SuccessToast,
                  error: ErrorToast,
                  info: InfoToast,
                }}
              />
            </ThemeModeProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </AuthProvider>
  );
}
