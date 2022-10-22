import { Tab, TabItemProps, useTheme } from '@rneui/themed';
import * as React from 'react';

import border from '../../styles/border';
import spacing from '../../styles/spacing';
import { subtitle3 } from '../../styles/typhography';
import useStyles from '../../utils/hooks/useStyles';

function TabItem({ ...props }: TabItemProps) {
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <Tab.Item
      buttonStyle={(active) => ({
        backgroundColor: active ? theme.colors.primary : theme.colors.secondary,
      })}
      containerStyle={[border.rounded, spacing.m_xs]}
      titleStyle={(active) => [
        subtitle3,
        spacing.px_0,
        spacing.py_0,
        active ? styles.textWhite : styles.textGrey,
      ]}
      {...props}
    />
  );
}

export default TabItem;
