import { Icon, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { Pressable, PressableProps, View } from 'react-native';

import { BORDER_RADIUS, styles } from '../theme/styles';
import BaseIcon, { BaseIconProps } from './bases/BaseIcon';

interface SettingMenuProp extends Omit<BaseIconProps, 'width'> {
  title: string;
  caption?: string;
  onPress?: PressableProps['onPress'];
  rightComponent?: React.ReactNode;
}

function SettingMenu({
  title,
  rightComponent,
  caption,
  onPress,
  backgroundColor,
  type,
  name,
}: SettingMenuProp) {
  const { theme } = useTheme();

  return (
    <Pressable
      style={[
        {
          flex: 1,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: theme.spacing.lg,
        },
      ]}
      android_ripple={{ color: theme.colors.grey4 }}
      onPress={onPress}
    >
      <View
        style={[
          styles.container,
          {
            flex: 1,
            flexDirection: 'row',
          },
        ]}
      >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <BaseIcon
            backgroundColor={backgroundColor}
            color={theme.colors.white}
            size={18}
            width={32}
            containerStyle={{
              marginRight: theme.spacing.lg,
              borderRadius: BORDER_RADIUS.md,
            }}
            type={type}
            name={name}
          />
          <Text>{title}</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          {rightComponent || (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: theme.colors.grey3 }} caption>
                {caption}
              </Text>
              <Icon
                size={20}
                containerStyle={{ marginLeft: theme.spacing.sm }}
                color={theme.colors.grey3}
                type="ionicon"
                name="chevron-forward-outline"
              />
            </View>
          )}
        </View>
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
