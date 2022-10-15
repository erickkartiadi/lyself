import { useTheme } from '@rneui/themed';
import React from 'react';
import BouncyCheckbox, { IBouncyCheckboxProps } from 'react-native-bouncy-checkbox';

import border from '../../styles/border';
import { subtitle2, text } from '../../styles/typhography';
import { SIZING } from '../../theme/theme';
import useStyles from '../../utils/hooks/useStyles';

export interface CheckboxProps extends IBouncyCheckboxProps {
  checked: boolean;
}

function Checkbox({
  innerIconStyle,
  checked,
  size,
  textStyle,
  fillColor,
  ...props
}: CheckboxProps) {
  const { theme } = useTheme();
  const styles = useStyles();
  return (
    <BouncyCheckbox
      {...props}
      size={size || SIZING['4xl']}
      fillColor={fillColor || theme.colors.primary}
      disableBuiltInState
      isChecked={checked}
      innerIconStyle={[border.width_lg, innerIconStyle]}
      textStyle={[text.decor_line_none, subtitle2, styles.textBlack, textStyle]}
    />
  );
}

export default Checkbox;
