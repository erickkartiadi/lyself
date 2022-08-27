import { Badge, Icon, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { BORDER_RADIUS } from '../../../theme/styles';

import { comingSoonToast } from '../../../utils/comingSoonToast';

function RightHeaderComponent() {
  const { theme } = useTheme();

  return (
    <View>
      <View>
        <Badge
          status="error"
          badgeStyle={{ borderColor: 'transparent' }}
          containerStyle={{ position: 'absolute', right: 3 }}
        />
        <Icon
          name="notifications-outline"
          type="ionicon"
          onPress={comingSoonToast}
          containerStyle={{
            borderRadius: BORDER_RADIUS.rounded,
            aspectRatio: 1,
          }}
          color={theme.colors.black}
          underlayColor={theme.colors.primary}
        />
      </View>
    </View>
  );
}

export default RightHeaderComponent;
