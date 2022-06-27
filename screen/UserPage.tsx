import { Text, useThemeMode } from '@rneui/themed';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

function UserPage() {
  const { mode } = useThemeMode();

  return (
    <SafeAreaView>
      <Text h1> {mode}</Text>
    </SafeAreaView>
  );
}

export default UserPage;
