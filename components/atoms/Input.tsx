import { Icon, Input, InputProps, useTheme } from '@rneui/themed';
import React, { useRef, useState } from 'react';
import useToggle from '../../utils/hooks/useToggle';

function InputText({ label, placeholder, ref, ...others }: InputProps) {
  const { theme } = useTheme();
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Input
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      labelStyle={{
        color: theme.colors.black,
      }}
      selectionColor={theme.colors.primary}
      inputContainerStyle={{
        borderColor: isFocused
          ? theme.colors.primary
          : theme.colors.greyOutline,
      }}
      label={label}
      placeholder={placeholder}
      ref={inputRef}
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
