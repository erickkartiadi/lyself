import { Icon } from '@rneui/themed';
import { themeSpacing } from '@rneui/themed/dist/config/ThemeProvider';
import React from 'react';
import { ColorValue } from 'react-native';

function BaseIcon({
  backgroundColor,
  size,
  iconSize,
  color,
  iconType,
  iconName,
}: {
  backgroundColor: ColorValue;
  size: number;
  color: ColorValue | number | undefined;
  iconSize: number;
  iconType: string;
  iconName: string;
}) {
  return (
    <Icon
      containerStyle={{
        backgroundColor,
        borderRadius: 100,
        marginRight: themeSpacing.xl,
        width: size,
        aspectRatio: 1,
        justifyContent: 'center',
        alignContent: 'center',
      }}
      size={iconSize}
      color={color}
      type={iconType}
      name={iconName}
    />
  );
}

export default BaseIcon;
