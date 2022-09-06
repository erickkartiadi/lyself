import { Icon, IconProps } from '@rneui/themed';
import * as React from 'react';
import { ColorValue, FlexStyle } from 'react-native';

import { BORDER_RADIUS } from '../../theme/styles';

export interface BaseIconProps
  extends Pick<IconProps, 'containerStyle' | 'color' | 'size' | 'type' | 'name'> {
  backgroundColor: ColorValue;
  width: FlexStyle['width'];
}

function BaseIcon({
  containerStyle,
  backgroundColor,
  width,
  color,
  size,
  type,
  name,
}: BaseIconProps) {
  return (
    <Icon
      containerStyle={[
        {
          backgroundColor,
          borderRadius: BORDER_RADIUS.rounded,
          width,
          aspectRatio: 1,
          justifyContent: 'center',
          alignContent: 'center',
        },
        containerStyle,
      ]}
      size={size}
      color={color}
      type={type}
      name={name}
    />
  );
}

export default BaseIcon;
