import { InlinePressableProps } from '@rneui/base';
import { Icon } from '@rneui/themed';
import React from 'react';
import { ColorValue, StyleProp, ViewStyle } from 'react-native';

function BaseIcon({
  containerStyle,
  backgroundColor,
  size,
  color,
  iconSize,
  iconType,
  iconName,
  onPress,
}: {
  containerStyle?: StyleProp<ViewStyle>;
  backgroundColor: ColorValue;
  size: number | undefined;
  color: ColorValue | number | undefined;
  iconSize: number;
  iconType: string;
  iconName: string;
  onPress?: InlinePressableProps['onPress'];
}) {
  return (
    <Icon
      onPress={onPress}
      containerStyle={[
        {
          backgroundColor,
          borderRadius: 100,
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
  onPress: (): void => {},
};

export default BaseIcon;
