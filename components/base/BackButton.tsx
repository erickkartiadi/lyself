import { useNavigation } from '@react-navigation/native';
import { Button, Icon } from '@rneui/themed';
import React from 'react';

import appStyles from '../../theme/appStyles';
import spacing from '../../theme/spacing';
import normalize from '../../utils/normalize';

function BackButton() {
  const navigation = useNavigation();

  const goBack = () => navigation.goBack();

  return (
    <Button
      type="outline"
      onPress={goBack}
      containerStyle={[spacing.mb_xl, appStyles.alignSelfStart]}
      buttonStyle={[spacing.py_md, spacing.px_md]}
    >
      <Icon size={normalize(24)} name="arrow-back-outline" type="ionicon" />
    </Button>
  );
}

export default BackButton;
