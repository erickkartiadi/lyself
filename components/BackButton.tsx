import { useNavigation } from '@react-navigation/native';
import { Button, Icon, useTheme } from '@rneui/themed';
import React from 'react';

function BackButton() {
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
      <Icon size={20} name="arrow-back-outline" type="ionicon" />
    </Button>
  );
}

export default BackButton;
