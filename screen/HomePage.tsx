import { Button, Text } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { PreferencesContext } from '../theme/PreferencesContext';

function HomePage() {
  const { theme, setPreferences } = useContext(PreferencesContext);

  return (
    <>
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
      <Text h1>Homepage</Text>
      <Button
        title={`Theme:${theme}`}
        onPress={() => setPreferences(theme === 'dark' ? 'light' : 'dark')}
      />
    </>
  );
}

export default HomePage;
