import { useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { Badge, Icon } from '@rneui/base';

function RightHeaderComponent() {
  const { theme } = useTheme();

  return (
    <View>
      <Badge
        status="error"
        badgeStyle={{ borderColor: 'transparent' }}
        containerStyle={{ position: 'absolute', right: 3 }}
      />
      <Icon
        name="notifications-outline"
        type="ionicon"
        onPress={() => console.log('go to notification page')}
        containerStyle={{ borderRadius: 100, aspectRatio: 1 }}
        color={theme.colors.black}
        underlayColor={theme.colors.primary}
      />
    </View>
  );
}

export default RightHeaderComponent;
