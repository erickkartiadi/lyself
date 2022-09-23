import { Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { Image, View } from 'react-native';

import noDataImageDark from '../../assets/images/no-data-image-dark.png';
import noDataImageLight from '../../assets/images/no-data-image-light.png';
import { ThemeModeContext } from '../../utils/context/ThemeModeContext';

function TodoEmptyScreen() {
  const { isDarkMode } = React.useContext(ThemeModeContext);
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          aspectRatio: 1,
          width: 160,
          marginBottom: theme.spacing.xl,
        }}
      >
        <Image
          style={{ flex: 1, width: '100%' }}
          source={isDarkMode ? noDataImageDark : noDataImageLight}
        />
      </View>
      <Text h4 style={{ marginBottom: theme.spacing.sm }}>
        Your list is empty
      </Text>
      <Text small style={{ marginBottom: 96, color: theme.colors.grey3 }}>
        Tap &quot; + &quot; button to add new list
      </Text>
    </View>
  );
}

export default TodoEmptyScreen;
