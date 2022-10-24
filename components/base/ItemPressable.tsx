import { Icon, IconProps, Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { Pressable, PressableProps, View } from 'react-native';

import layout from '../../styles/layout';
import spacing from '../../styles/spacing';

interface ItemPressableProps extends PressableProps {
  title: string;
  iconProps: IconProps;
}

function ItemPressable({ title, iconProps, ...props }: ItemPressableProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      android_ripple={{ color: theme.colors.secondary }}
      style={[layout.container_gutter, spacing.py_lg]}
      {...props}
    >
      <View style={[layout.flex_dir_row, layout.align_center]}>
        <Icon {...iconProps} containerStyle={spacing.mr_lg} />
        <Text subtitle>{title}</Text>
      </View>
    </Pressable>
  );
}

export default ItemPressable;
