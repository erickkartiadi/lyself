import { Icon, IconProps, normalize, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { Pressable, PressableProps, View } from 'react-native';

import appStyles from '../../theme/appStyles';
import spacing from '../../theme/spacing';
import { BORDER_RADIUS } from '../../theme/theme';

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
        appStyles.flex,
        appStyles.flexDirRow,
        appStyles.w100,
        appStyles.alignCenter,
        appStyles.justifyBetween,
        spacing.py_md,
      ]}
      android_ripple={{ color: theme.colors.grey4 }}
      onPress={onPress}
    >
      <View style={[appStyles.container, appStyles.flexDirRow]}>
        <View style={[appStyles.flex, appStyles.flexDirRow, appStyles.alignCenter]}>
          <Icon
            backgroundColor={backgroundColor}
            name={name}
            type={type}
            color={theme.colors.white}
            size={normalize(18)}
            iconStyle={{
              padding: theme.spacing.md,
              borderRadius: BORDER_RADIUS.rounded,
            }}
            containerStyle={spacing.mr_xl}
          />
          <Text subtitle color={theme.colors.grey1}>
            {title}
          </Text>
        </View>
        {rightComponent || (
          <View style={[appStyles.flexDirRow, appStyles.alignCenter]}>
            <Text small>{caption}</Text>
            <Icon
              size={normalize(18)}
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
