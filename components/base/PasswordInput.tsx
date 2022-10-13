import { Icon, InputProps, useTheme } from '@rneui/themed';
import React from 'react';

import border from '../../styles/border';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import useToggle from '../../utils/hooks/useToggle';
import TextInput from './TextInput';

function PasswordInput({ label, placeholder, ...props }: InputProps) {
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
          containerStyle={border.rounded}
          size={SIZING['3xl']}
          iconStyle={spacing.p_sm}
          color={theme.colors.black}
          onPress={() => togglePasswordVisible()}
        />
      }
      {...props}
    />
  );
}

export default PasswordInput;
