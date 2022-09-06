import { Input, InputProps, useTheme } from '@rneui/themed';
import React, { useState } from 'react';

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
        borderColor: isFocused ? theme.colors.primary : theme.colors.greyOutline,
      }}
      label={label}
      placeholder={placeholder}
      {...rest}
    />
  );
}

export default TextInput;
