import React from 'react';
import { Button, ButtonProps, Icon, useTheme } from '@rneui/themed';

function ButtonBack({ onPress }: ButtonProps) {
  const { theme } = useTheme();
  return (
    <Button
      type="outline"
      onPress={onPress}
      containerStyle={{
        alignSelf: 'flex-start',
        marginBottom: theme.spacing.lg,
      }}
      buttonStyle={{ padding: 10, paddingHorizontal: 10 }}
    >
      <Icon
        size={20}
        name="arrow-back-outline"
        type="ionicon"
        containerStyle={{ aspectRatio: 1, padding: 0 }}
      />
    </Button>
  );
}

export default ButtonBack;
