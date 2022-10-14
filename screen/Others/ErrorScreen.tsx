import { Text } from '@rneui/themed';
import * as React from 'react';
import { Image, View } from 'react-native';

import errorImage from '../../assets/images/error-image.png';
import layout from '../../styles/layout';
import { width } from '../../styles/size';
import spacing from '../../styles/spacing';
import useStyles from '../../utils/hooks/useStyles';
import normalize from '../../utils/normalize';

function ErrorScreen() {
  const styles = useStyles();

  return (
    <View style={layout.flex}>
      <View style={[layout.flex, layout.align_center, layout.justify_center]}>
        <View style={[spacing.mb_xl, layout.ratio_square, width.w_10xl]}>
          <Image style={[layout.flex, width.w_100]} source={errorImage} />
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
