import { Button, ButtonProps, useTheme } from '@rneui/themed';
import * as React from 'react';

import { height } from '../../styles/size';

type ReplySwipeableLeftProps = Pick<ButtonProps, 'onPress' | 'loading'>;

function ReplySwipeableLeft({ onPress, loading }: ReplySwipeableLeftProps) {
  const { theme } = useTheme();

  return (
    <Button
      onPress={onPress}
      color="secondary"
      radius="md"
      iconPosition="top"
      icon={{ name: 'arrow-undo', color: theme.colors.grey0, type: 'ionicon', size: 24 }}
      buttonStyle={height.h_100}
      loading={loading}
    />
  );
}

export default ReplySwipeableLeft;
