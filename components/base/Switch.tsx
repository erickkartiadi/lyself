import { SwitchProps } from '@rneui/base';
import { Switch, useTheme } from '@rneui/themed';
import * as React from 'react';

function SwitchToggle(props: SwitchProps) {
  const { theme } = useTheme();

  return (
    <Switch
      {...props}
      trackColor={{
        true: theme.colors.primary,
        false: theme.colors.grey4,
      }}
    />
  );
}

export default SwitchToggle;
