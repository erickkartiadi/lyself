import { Input, InputProps, useTheme } from '@rneui/themed';
import React, { useState } from 'react';

import border from '../../styles/border';
import spacing from '../../styles/spacing';
import { caption, regular } from '../../styles/typhography';
import useStyles from '../../utils/hooks/useStyles';

function TextInput({
  label,
  placeholder,
  ref,
  onBlur,
  errorMessage,
  inputStyle,
  inputContainerStyle,
  containerStyle,
  errorStyle,
  ...props
}: InputProps) {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const styles = useStyles();

  let borderColor = theme.colors.secondary;
  if (isFocused) borderColor = theme.colors.grey4;
  if (errorMessage) borderColor = theme.colors.error;

  return (
    <Input
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        onBlur?.(e);
        setIsFocused(false);
      }}
      labelStyle={[styles.textBlack, spacing.mb_sm]}
      selectionColor={theme.colors.primary}
      inputContainerStyle={[
        spacing.px_lg,
        spacing.py_xs,
        styles.borderGrey5,
        border.width_md,
        border.radius_lg,
        styles.secondaryBackground,
        {
          borderColor,
        },
        inputContainerStyle,
      ]}
      containerStyle={[containerStyle]}
      inputStyle={[regular, inputStyle]}
      errorMessage={errorMessage}
      errorStyle={[
        caption,
        spacing.mx_0,
        spacing.mt_sm,
        spacing.mb_xl,
        spacing.m_0,
        errorStyle,
      ]}
      label={label}
      placeholderTextColor={theme.colors.grey2}
      placeholder={placeholder}
      {...props}
    />
  );
}

export default TextInput;
