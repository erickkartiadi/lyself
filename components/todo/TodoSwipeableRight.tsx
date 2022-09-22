import { Button, ButtonProps } from '@rneui/themed';
import * as React from 'react';

type TodoSwipeableRightProps = Pick<ButtonProps, 'onPress'>;

function TodoSwipeableRight({ onPress }: TodoSwipeableRightProps) {
  return (
    <Button
      fullWidth
      onPress={onPress}
      color="error"
      radius={0}
      iconPosition="top"
      containerStyle={{ marginHorizontal: 0 }}
      icon={{ name: 'trash', color: 'white', type: 'ionicon' }}
      buttonStyle={{ minHeight: '100%' }}
    />
  );
}

export default TodoSwipeableRight;
