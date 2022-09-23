import { Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { Image, View } from 'react-native';

import noDataImageDark from '../../assets/images/no-data-image-dark.png';
import noDataImageLight from '../../assets/images/no-data-image-light.png';
import { ThemeModeContext } from '../../utils/context/ThemeModeContext';

function TodoEmptyMessage() {
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
          width: 96,
          marginBottom: theme.spacing.lg,
        }}
      >
        <Image
          style={{ flex: 1, width: '100%' }}
          source={isDarkMode ? noDataImageDark : noDataImageLight}
        />
      </View>
      <Text small style={{ marginBottom: 48 }}>
        Your todo list is empty
      </Text>
    </View>
  );
}

export default TodoEmptyMessage;
