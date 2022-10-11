import { Input, InputProps, useTheme } from '@rneui/themed';
import React, { useState } from 'react';

import { FONT } from '../../theme/theme';

// TODO update input styles

interface TextInputProps extends InputProps {
  showBorder?: boolean;
  enableErrorMessage?: boolean;
}

function TextInput({
  label,
  placeholder,
  ref,
  onBlur,
  errorMessage,
  enableErrorMessage,
  showBorder,
  inputStyle,
  inputContainerStyle,
  containerStyle,
  ...props
}: TextInputProps) {
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
      containerStyle={[containerStyle]}
      selectionColor={theme.colors.primary}
      inputContainerStyle={[
        {
          borderColor:
            isFocused || errorMessage ? theme.colors.primary : theme.colors.greyOutline,
          borderBottomWidth: showBorder ? 1 : 0,
        },
        inputContainerStyle,
      ]}
      inputStyle={[inputStyle]}
      errorMessage={errorMessage}
      errorStyle={[
        FONT.caption,
        {
          marginBottom: errorMessage ? theme.spacing.xl : 0,
          marginHorizontal: 0,
          display: enableErrorMessage ? 'flex' : 'none',
        },
      ]}
      label={label}
      placeholder={placeholder}
      {...props}
    />
  );
}

TextInput.defaultProps = {
  showBorder: true,
  enableErrorMessage: true,
};

export default TextInput;
