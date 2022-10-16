import { Icon, IconProps, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import layout from '../../styles/layout';
import { SIZING } from '../../theme/theme';

export interface ButtonLinkProps extends TouchableOpacityProps {
  color?: 'primary' | 'blue';
  icon?: IconProps;
}

function ButtonLink({
  onPress,
  children,
  color = 'blue',
  icon,
  style,
  ...props
}: React.PropsWithChildren<ButtonLinkProps>) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[layout.flex_dir_row, layout.align_center, style]}
      onPress={onPress}
      {...props}
    >
      <Text
        style={{
          color: theme.colors[color],
        }}
      >
        {children}
      </Text>
      {icon && <Icon size={SIZING['3xl']} color={theme.colors[color]} {...icon} />}
    </TouchableOpacity>
  );
}

ButtonLink.defaultProps = {
  color: 'blue',
  icon: undefined,
};

export default ButtonLink;
