import { useNavigation } from '@react-navigation/native';
import { Button, Icon, useTheme } from '@rneui/themed';
import React from 'react';

import normalize from '../utils/normalize';

function BackButton() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const goBack = () => navigation.goBack();

  return (
    <Button
      type="outline"
      onPress={goBack}
      containerStyle={{
        alignSelf: 'flex-start',
        marginBottom: theme.spacing.xl,
      }}
      buttonStyle={{
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
      }}
    >
      <Icon size={normalize(24)} name="arrow-back-outline" type="ionicon" />
    </Button>
  );
}

export default BackButton;
