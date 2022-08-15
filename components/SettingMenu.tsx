import { Icon, Text, useTheme } from '@rneui/themed';
import React, { useContext } from 'react';
import { ColorValue, Pressable, View } from 'react-native';
import { ThemeModeContext } from '../theme/ThemeModeContext';
import BaseIcon from './BaseIcon';

interface SettingMenuProp {
  title: string;

  bgColor: ColorValue;
  bgColorDark: ColorValue;
  iconName: string;
  iconType: string;
  rightComponent?: JSX.Element;
  value?: string | undefined;
}

function ChevronIcon(value: string | undefined) {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ color: theme.colors.grey2 }} sm>
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
        paddingHorizontal: theme.spacing.xl,
      }}
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
          color="white"
          containerStyle={{
            marginRight: theme.spacing.lg,
            borderRadius: 8,
          }}
          iconType={iconType}
          iconName={iconName}
        />
        <Text h4>{title}</Text>
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
};

export default SettingMenu;
