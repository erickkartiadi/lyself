import { Icon, InputProps, useTheme } from '@rneui/themed';
import React from 'react';

import { BORDER_RADIUS } from '../../theme/styles';
import useToggle from '../../utils/hooks/useToggle';
import TextInput from './Input';

function PasswordInput({ label, placeholder, ...rest }: InputProps) {
  const [isPasswordVisible, togglePasswordVisible] = useToggle(false);
  const { theme } = useTheme();

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      secureTextEntry={!isPasswordVisible}
      rightIcon={
        <Icon
          name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
          type="ionicon"
          containerStyle={{ borderRadius: BORDER_RADIUS.rounded }}
          size={24}
          iconStyle={{ padding: theme.spacing.sm }}
          color={theme.colors.black}
          onPress={() => togglePasswordVisible()}
        />
      }
      {...rest}
    />
  );
}

export default PasswordInput;
