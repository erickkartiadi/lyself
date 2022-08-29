import React from 'react';
import { Button, Icon, useTheme } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

function ButtonBack() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <Button
      type="outline"
      onPress={() => navigation.goBack()}
      containerStyle={{
        alignSelf: 'flex-start',
        marginBottom: theme.spacing.xl,
      }}
      buttonStyle={{
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
      }}
    >
      <Icon
        size={18}
        name="arrow-back-outline"
        type="ionicon"
        containerStyle={{ aspectRatio: 1, padding: 0 }}
      />
    </Button>
  );
}

export default ButtonBack;
