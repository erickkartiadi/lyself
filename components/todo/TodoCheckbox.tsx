import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import { FONT } from '../../theme/theme';

interface TodoCheckboxProps {
  onCheckboxPress: (checked: boolean) => void;
  checked: boolean;
  size: number;
  color: string;
}

function TodoCheckbox({ onCheckboxPress, checked, size, color }: TodoCheckboxProps) {
  return (
    <BouncyCheckbox
      size={size}
      disableBuiltInState
      isChecked={checked}
      fillColor={color}
      innerIconStyle={{ borderWidth: 2 }}
      textStyle={FONT.regular}
      onPress={onCheckboxPress}
    />
  );
}

export default TodoCheckbox;
