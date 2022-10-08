import { Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { Image, View } from 'react-native';

import errorImage from '../../assets/images/error-image.png';
import appStyles from '../../theme/appStyles';
import spacing from '../../theme/spacing';
import normalize from '../../utils/normalize';

function ErrorScreen() {
  const { theme } = useTheme();

  return (
    <View style={appStyles.flex}>
      <View style={[appStyles.flex, appStyles.alignCenter, appStyles.justifyCenter]}>
        <View
          style={[
            spacing.mb_xl,
            {
              aspectRatio: 1,
              width: 160,
            },
          ]}
        >
          <Image style={[appStyles.flex, appStyles.w100]} source={errorImage} />
        </View>
        <Text h4 style={spacing.mb_sm}>
          Something went wrong
        </Text>
        <Text
          small
          color={theme.colors.grey3}
          style={{ marginBottom: normalize(96, 'height') }}
        >
          Please try again later
        </Text>
      </View>
    </View>
  );
}

export default ErrorScreen;
