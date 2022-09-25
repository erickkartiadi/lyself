import { Button, ButtonProps } from '@rneui/themed';
import * as React from 'react';

import { BORDER_RADIUS, GUTTER_SIZE } from '../../theme/styles';

type TodoSwipeableRightProps = Pick<ButtonProps, 'onPress'>;

function TodoSwipeableRight({ onPress }: TodoSwipeableRightProps) {
  return (
    <Button
      fullWidth
      onPress={onPress}
      color="error"
      radius={BORDER_RADIUS.md}
      iconPosition="top"
      icon={{ name: 'trash', color: 'white', type: 'ionicon', size: 24 }}
      containerStyle={{ marginRight: GUTTER_SIZE }}
      buttonStyle={{ minHeight: '100%' }}
    />
  );
}

export default TodoSwipeableRight;
