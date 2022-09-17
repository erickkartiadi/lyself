import { Button } from '@rneui/themed';
import * as React from 'react';

import { comingSoonToast } from '../utils/toast';

function SwipeableRightButton() {
  return (
    <Button
      fullWidth
      onPress={comingSoonToast}
      color="primary"
      title="Archive"
      radius={0}
      iconPosition="top"
      containerStyle={{ marginHorizontal: 0 }}
      icon={{ name: 'archive', color: 'white', type: 'ionicon' }}
      buttonStyle={{ minHeight: '100%' }}
    />
  );
}
function SwipeableLeftButton() {
  return (
    <Button
      fullWidth
      onPress={comingSoonToast}
      color="error"
      title="Delete"
      radius={0}
      iconPosition="top"
      containerStyle={{ marginHorizontal: 0 }}
      icon={{ name: 'trash-bin', color: 'white', type: 'ionicon' }}
      buttonStyle={{ minHeight: '100%' }}
    />
  );
}

export { SwipeableLeftButton, SwipeableRightButton };
