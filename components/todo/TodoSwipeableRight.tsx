import { Button, ButtonProps } from '@rneui/themed';
import * as React from 'react';

import { BORDER_RADIUS } from '../../theme/theme';

type TodoSwipeableRightProps = Pick<ButtonProps, 'onPress' | 'loading'>;

function TodoSwipeableRight({ onPress, loading }: TodoSwipeableRightProps) {
  return (
    <Button
      onPress={onPress}
      color="error"
      radius={BORDER_RADIUS.md}
      iconPosition="top"
      icon={{ name: 'trash', color: 'white', type: 'ionicon', size: 24 }}
      buttonStyle={{ minHeight: '100%' }}
      loading={loading}
    />
  );
}

export default TodoSwipeableRight;
