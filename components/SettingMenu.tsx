import { Icon, IconProps, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { Pressable, PressableProps, View } from 'react-native';

import { BORDER_RADIUS, styles } from '../theme/styles';

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
        {
          flex: 1,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: theme.spacing.md,
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
          <Icon
            backgroundColor={backgroundColor}
            name={name}
            type={type}
            color={theme.colors.white}
            size={16}
            iconStyle={{
              padding: theme.spacing.md,
              borderRadius: BORDER_RADIUS.rounded,
            }}
            containerStyle={{
              marginRight: theme.spacing.xl,
            }}
          />
          <Text subtitle2 color={theme.colors.grey1}>
            {title}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          {rightComponent || (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Text caption>{caption}</Text>
              <Icon
                size={18}
                containerStyle={{ marginLeft: theme.spacing.sm }}
                type="ionicon"
                name="chevron-forward"
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
