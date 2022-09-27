import { Text, useTheme } from '@rneui/themed';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export interface BaseLinkProps extends TouchableOpacityProps {
  color?: 'primary' | 'blue';
}

function BaseLink({
  onPress,
  children,
  color = 'blue',
  ...props
}: React.PropsWithChildren<BaseLinkProps>) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} {...props}>
      <Text
        style={{
          color: theme.colors[color],
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

BaseLink.defaultProps = {
  color: 'blue',
};

export default BaseLink;
