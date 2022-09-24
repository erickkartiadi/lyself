import { Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { Image, View } from 'react-native';

import errorImage from '../../assets/images/error-image.png';

function ErrorScreen() {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1 }}>
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
          <Image style={{ flex: 1, width: '100%' }} source={errorImage} />
        </View>
        <Text h4 style={{ marginBottom: theme.spacing.sm }}>
          Something went wrong
        </Text>
        <Text small color={theme.colors.grey3} style={{ marginBottom: 96 }}>
          Please try again later
        </Text>
      </View>
    </View>
  );
}

export default ErrorScreen;
