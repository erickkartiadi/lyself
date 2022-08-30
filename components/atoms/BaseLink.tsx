import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Text, useTheme } from '@rneui/themed';

export interface BaseLinkProps {
  color?: 'primary';
  children: React.ReactNode;
}

function BaseLink({
  onPress,
  color,
  children,
  ...rest
}: TouchableOpacityProps & BaseLinkProps) {
  const { theme } = useTheme();

  const colors = {
    primary: theme.colors.primary,
    default: theme.colors.blue,
  };

  return (
    <TouchableOpacity onPress={onPress} {...rest}>
      <Text
        subtitle2
        style={{
          color: color != null ? colors[color] : colors.default,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

BaseLink.defaultProps = {
  color: 'default',
};

export default BaseLink;
