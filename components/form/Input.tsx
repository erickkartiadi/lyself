import { Icon, Input, InputProps, useTheme } from '@rneui/themed';
import React from 'react';
import useToggle from '../../utils/hooks/useToggle';

function InputText({ label, placeholder, ...others }: InputProps) {
  const { theme } = useTheme();

  return (
    <Input
      labelStyle={{ color: theme.colors.black }}
      selectionColor={theme.colors.primary}
      inputContainerStyle={{ borderColor: theme.colors.grey3 }}
      label={label}
      placeholder={placeholder}
      {...others}
    />
  );
}

function InputPassword() {
  const [isPasswordVisible, togglePasswordVisible] = useToggle(false);
  const { theme } = useTheme();

  return (
    <InputText
      label="Password"
      placeholder="must have at least 8 characters"
      secureTextEntry={!isPasswordVisible}
      rightIcon={
        <Icon
          name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
          type="ionicon"
          size={24}
          iconStyle={{ padding: theme.spacing.sm }}
          color={theme.colors.black}
          onPress={() => togglePasswordVisible()}
        />
      }
    />
  );
}

export { InputPassword, InputText };
