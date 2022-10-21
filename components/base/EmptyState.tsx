import { Text } from '@rneui/themed';
import * as React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';

import emptyIllustration from '../../assets/images/empty-illustration.png';
import layout from '../../styles/layout';
import { width } from '../../styles/size';
import spacing from '../../styles/spacing';
import useStyles from '../../utils/hooks/useStyles';
import normalize from '../../utils/normalize';

interface EmptyScreenProps {
  title: string;
  text: string;
  source?: ImageSourcePropType;
}

function EmptyState({ title, text, source = emptyIllustration }: EmptyScreenProps) {
  const styles = useStyles();

  return (
    <View style={[layout.justify_center, layout.align_center, layout.flex_grow]}>
      <View style={[spacing.mb_xl, layout.ratio_square, width.w_11xl]}>
        <Image style={[layout.flex, width.w_100]} source={source} />
      </View>
      <Text h4 style={spacing.mb_sm}>
        {title}
      </Text>
      <Text small style={[styles.textGrey, { marginBottom: normalize(96, 'height') }]}>
        {text}
      </Text>
    </View>
  );
}

EmptyState.defaultProps = {
  source: emptyIllustration,
};

export default EmptyState;
