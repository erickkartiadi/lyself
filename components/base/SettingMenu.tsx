import { Icon, IconProps, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { Pressable, PressableProps, View } from 'react-native';

import border from '../../styles/border';
import layout from '../../styles/layout';
import { width } from '../../styles/size';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';

interface SettingMenuProp {
  title: string;
  caption?: string;
  onPress?: PressableProps['onPress'];
  rightComponent?: React.ReactNode;
  icon: Pick<IconProps, 'type' | 'name' | 'backgroundColor'>;
}

function SettingMenu({
  title,
  rightComponent,
  caption,
  onPress,
  icon: { backgroundColor, type, name },
}: SettingMenuProp) {
  const { theme } = useTheme();
  return (
    <Pressable
      style={[
        layout.flex,
        layout.flex_dir_row,
        width.w_100,
        layout.align_center,
        layout.justify_between,
        spacing.py_md,
      ]}
      android_ripple={{ color: theme.colors.grey4 }}
      onPress={onPress}
    >
      <View style={[layout.container, layout.flex_dir_row]}>
        <View style={[layout.flex, layout.flex_dir_row, layout.align_center]}>
          <Icon
            backgroundColor={backgroundColor}
            name={name}
            type={type}
            color={theme.colors.white}
            size={SIZING['2xl']}
            iconStyle={spacing.p_md}
            containerStyle={[spacing.mr_xl, border.rounded]}
          />
          <Text subtitle>{title}</Text>
        </View>
        {rightComponent || (
          <View style={[layout.flex_dir_row, layout.align_center]}>
            <Text small>{caption}</Text>
            <Icon
              size={SIZING['2xl']}
              containerStyle={spacing.ml_sm}
              type="ionicon"
              name="chevron-forward"
            />
          </View>
        )}
      </View>
    </Pressable>
  );
}

SettingMenu.defaultProps = {
  rightComponent: null,
  caption: '',
  onPress: (): void => {},
};

export default SettingMenu;
