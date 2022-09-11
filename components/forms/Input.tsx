import { Input, InputProps, useTheme } from '@rneui/themed';
import React, { useState } from 'react';

import { FONT } from '../../theme/styles';

function TextInput({
  label,
  placeholder,
  ref,
  onBlur,
  errorMessage,
  ...rest
}: InputProps) {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Input
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        onBlur?.(e);
        setIsFocused(false);
      }}
      labelStyle={{
        color: theme.colors.black,
      }}
      selectionColor={theme.colors.primary}
      inputContainerStyle={{
        borderColor:
          isFocused || errorMessage ? theme.colors.primary : theme.colors.greyOutline,
      }}
      errorMessage={errorMessage}
      errorStyle={[
        FONT.caption,
        {
          marginBottom: errorMessage ? theme.spacing.xl : 0,
          marginHorizontal: 0,
        },
      ]}
      label={label}
      placeholder={placeholder}
      {...rest}
    />
  );
}

export default TextInput;
