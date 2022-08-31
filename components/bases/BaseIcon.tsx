import { Icon } from '@rneui/themed';
import React from 'react';
import { ColorValue, StyleProp, ViewStyle } from 'react-native';

import { BORDER_RADIUS } from '../../theme/styles';

function BaseIcon({
  containerStyle,
  backgroundColor,
  size,
  color,
  iconSize,
  iconType,
  iconName,
}: {
  containerStyle?: StyleProp<ViewStyle>;
  backgroundColor: ColorValue;
  size: number | undefined;
  color: ColorValue | number | undefined;
  iconSize: number;
  iconType: string;
  iconName: string;
}) {
  return (
    <Icon
      containerStyle={[
        {
          backgroundColor,
          borderRadius: BORDER_RADIUS.rounded,
          width: size,
          aspectRatio: 1,
          justifyContent: 'center',
          alignContent: 'center',
        },
        containerStyle,
      ]}
      size={iconSize}
      color={color}
      type={iconType}
      name={iconName}
    />
  );
}

BaseIcon.defaultProps = {
  containerStyle: {},
};

export default BaseIcon;
