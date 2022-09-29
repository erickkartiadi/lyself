import { Text, useTheme } from '@rneui/themed';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export interface ButtonLinkProps extends TouchableOpacityProps {
  color?: 'primary' | 'blue';
}

function ButtonLink({
  onPress,
  children,
  color = 'blue',
  ...props
}: React.PropsWithChildren<ButtonLinkProps>) {
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

ButtonLink.defaultProps = {
  color: 'blue',
};

export default ButtonLink;
