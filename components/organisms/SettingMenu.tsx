import { Icon, Text, useTheme } from '@rneui/themed';
import React, { useContext } from 'react';
import { ColorValue, Pressable, PressableProps, View } from 'react-native';
import { BORDER_RADIUS } from '../../theme/styles';
import { ThemeModeContext } from '../../theme/ThemeModeContext';
import BaseIcon from '../atoms/BaseIcon';

interface SettingMenuProp {
  title: string;
  bgColor: ColorValue;
  bgColorDark: ColorValue;
  iconName: string;
  iconType: string;
  rightComponent?: JSX.Element;
  value?: string | undefined;
  onPress?: PressableProps['onPress'];
}

function ChevronIcon(value: string | undefined) {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ color: theme.colors.grey2 }} caption>
        {value}
      </Text>
      <Icon
        size={21}
        containerStyle={{ marginLeft: 3 }}
        color={theme.colors.grey3}
        type="ionicon"
        name="chevron-forward"
      />
    </View>
  );
}

function SettingMenu({
  title,
  bgColor,
  bgColorDark,
  iconName,
  iconType,
  rightComponent: RightComponent,
  value,
  onPress,
}: SettingMenuProp) {
  const { theme } = useTheme();
  const { isDarkMode } = useContext(ThemeModeContext);

  return (
    <Pressable
      style={{
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: theme.spacing.md,
      }}
      onPress={onPress}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <BaseIcon
          backgroundColor={isDarkMode ? bgColorDark : bgColor}
          iconSize={18}
          size={32}
          color={theme.colors.white}
          containerStyle={{
            marginRight: theme.spacing.lg,
            borderRadius: BORDER_RADIUS.md,
          }}
          iconType={iconType}
          iconName={iconName}
        />
        <Text>{title}</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
        }}
      >
        {RightComponent || ChevronIcon(value)}
      </View>
    </Pressable>
  );
}

SettingMenu.defaultProps = {
  rightComponent: null,
  value: '',
  onPress: (): void => {},
};

export default SettingMenu;
