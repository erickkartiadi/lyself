import { useTheme } from '@rneui/themed';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import { FONT } from '../../theme/styles';

interface TodoCheckboxProps {
  onCheckboxPress: (checked: boolean) => void;
  checked: boolean;
  boxOutlineColor: string;
  size: number;
}

function TodoCheckbox({
  onCheckboxPress,
  checked,
  boxOutlineColor,
  size,
}: TodoCheckboxProps) {
  const { theme } = useTheme();
  return (
    <BouncyCheckbox
      size={size}
      disableBuiltInState
      isChecked={checked}
      fillColor={checked ? theme.colors.grey3 : boxOutlineColor}
      innerIconStyle={{ borderWidth: 2 }}
      textStyle={FONT.regular}
      onPress={onCheckboxPress}
    />
  );
}

export default TodoCheckbox;
