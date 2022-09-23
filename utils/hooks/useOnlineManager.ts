import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';
import * as React from 'react';
import { Platform } from 'react-native';

// auto refetch on reconnect
export default function useOnlineManager() {
  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (Platform.OS !== 'web') {
      return NetInfo.addEventListener((state) => {
        onlineManager.setOnline(
          state.isConnected != null &&
            state.isConnected &&
            Boolean(state.isInternetReachable)
        );
      });
    }
  }, []);
}
