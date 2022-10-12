import { makeStyles, useTheme } from '@rneui/themed';
import React from 'react';
import BouncyCheckbox, { IBouncyCheckboxProps } from 'react-native-bouncy-checkbox';

import { FONT } from '../../theme/theme';

interface CheckboxProps extends IBouncyCheckboxProps {
  onCheckboxPress: (checked: boolean) => void;
  checked: boolean;
  size: number;
}

const useStyles = makeStyles((theme) => ({
  text: {
    textDecorationLine: 'none',
  },
  border: {
    borderColor: theme.colors.grey3,
  },
}));

function Checkbox({
  onCheckboxPress,
  checked,
  size,
  textStyle,
  ...props
}: CheckboxProps) {
  const { theme } = useTheme();
  const styles = useStyles();
  return (
    <BouncyCheckbox
      {...props}
      size={size}
      disableBuiltInState
      isChecked={checked}
      iconStyle={{ borderColor: theme.colors.blue }}
      innerIconStyle={{
        borderWidth: 2,
      }}
      textStyle={[styles.text, FONT.regular, textStyle]}
      onPress={onCheckboxPress}
    />
  );
}

export default Checkbox;
