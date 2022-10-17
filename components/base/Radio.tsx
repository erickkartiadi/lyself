import { Icon, useTheme } from '@rneui/themed';
import * as React from 'react';

import layout from '../../styles/layout';
import Checkbox, { CheckboxProps } from './Checkbox';

function Radio({ checked, ...props }: CheckboxProps) {
  const { theme } = useTheme();

  return (
    <Checkbox
      innerIconStyle={{
        borderColor: checked ? theme.colors.primary : theme.colors.grey3,
      }}
      checked={checked}
      iconComponent={
        checked ? (
          <Icon color={theme.colors.white} name="dot-fill" type="octicon" />
        ) : undefined
      }
      textContainerStyle={layout.flex}
      {...props}
    />
  );
}

export default Radio;
