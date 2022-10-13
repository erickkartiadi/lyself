import { Text } from '@rneui/themed';
import * as React from 'react';
import { Image, View } from 'react-native';

import errorImage from '../../assets/images/error-image.png';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import useStyles from '../../utils/hooks/useStyles';
import normalize from '../../utils/normalize';

function ErrorScreen() {
  const styles = useStyles();

  return (
    <View style={layout.flex}>
      <View style={[layout.flex, layout.alignCenter, layout.justifyCenter]}>
        <View
          style={[
            spacing.mb_xl,
            layout.aspectRatioSquare,
            {
              width: SIZING['10xl'],
            },
          ]}
        >
          <Image style={[layout.flex, layout.w100]} source={errorImage} />
        </View>
        <Text h4 style={spacing.mb_sm}>
          Something went wrong
        </Text>
        <Text small style={[styles.textGrey, { marginBottom: normalize(96, 'height') }]}>
          Please try again later
        </Text>
      </View>
    </View>
  );
}

export default ErrorScreen;
