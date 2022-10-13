import React from 'react';
import BouncyCheckbox, { IBouncyCheckboxProps } from 'react-native-bouncy-checkbox';

import border from '../../styles/border';
import { regular, text } from '../../styles/typhography';

interface CheckboxProps extends IBouncyCheckboxProps {
  checked: boolean;
  size: number;
}

function Checkbox({ checked, size, textStyle, ...props }: CheckboxProps) {
  return (
    <BouncyCheckbox
      {...props}
      size={size}
      disableBuiltInState
      isChecked={checked}
      innerIconStyle={border.width_lg}
      textStyle={[text.decor_line_none, regular, textStyle]}
    />
  );
}

export default Checkbox;
