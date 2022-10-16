import { Icon, InputProps, useTheme } from '@rneui/themed';
import React from 'react';

import border from '../../styles/border';
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
      rightIconContainerStyle={{ marginHorizontal: 0, marginVertical: 0 }}
      rightIcon={
        <Icon
          name={isPasswordVisible ? 'eye-off' : 'eye'}
          type="ionicon"
          containerStyle={border.rounded}
          size={SIZING['3xl']}
          color={theme.colors.grey3}
          onPress={() => togglePasswordVisible()}
        />
      }
      {...props}
    />
  );
}

export default PasswordInput;
