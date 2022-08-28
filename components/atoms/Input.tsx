import { Icon, Input, InputProps, useTheme } from '@rneui/themed';
import React, { useState } from 'react';
import { BORDER_RADIUS } from '../../theme/styles';
import useToggle from '../../utils/hooks/useToggle';

function TextInput({ label, placeholder, ref, ...rest }: InputProps) {
  const { theme } = useTheme();
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
      {...rest}
    />
  );
}

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

export { PasswordInput, TextInput };
