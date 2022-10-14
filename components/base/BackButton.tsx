import { useNavigation } from '@react-navigation/native';
import { Button, Icon } from '@rneui/themed';
import React from 'react';

import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';

function BackButton() {
  const navigation = useNavigation();

  const goBack = () => navigation.goBack();

  return (
    <Button
      type="outline"
      onPress={goBack}
      containerStyle={[spacing.mb_xl, layout.align_self_start]}
      buttonStyle={[spacing.py_md, spacing.px_md]}
    >
      <Icon size={SIZING['2xl']} name="arrow-back-outline" type="ionicon" />
    </Button>
  );
}

export default BackButton;
