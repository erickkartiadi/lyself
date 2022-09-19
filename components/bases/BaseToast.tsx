import { IconProps, useTheme } from '@rneui/themed';
import * as React from 'react';
import { Dimensions, View } from 'react-native';
import {
  BaseToast as RNToast,
  BaseToastProps as RNToastProps,
} from 'react-native-toast-message';

import {
  BORDER_RADIUS,
  FONT,
  FONT_FAMILY,
  GUTTER_SIZE,
  styles,
} from '../../theme/styles';
import BaseIcon from './BaseIcon';

interface BaseToastProps extends RNToastProps {
  color: string;
  iconName: IconProps['name'];
  iconType: IconProps['type'];
}

function BaseToast({ color, iconName, iconType, ...rest }: BaseToastProps) {
  const { theme } = useTheme();

  return (
    <RNToast
      {...rest}
      style={[
        styles.shadowLarge,
        {
          borderRadius: BORDER_RADIUS.md,
          backgroundColor: theme.colors.background,
          borderLeftWidth: theme.spacing.sm,
          borderLeftColor: color,
          width: Dimensions.get('window').width - GUTTER_SIZE * 2,
          paddingHorizontal: theme.spacing.xl,
          height: '100%',
          paddingVertical: theme.spacing.xl,
        },
      ]}
      text1Style={[
        FONT.small,
        { fontFamily: FONT_FAMILY.medium, color: theme.colors.black },
      ]}
      text2Style={[FONT.caption, { color: theme.colors.grey3 }]}
      text2NumberOfLines={3}
      contentContainerStyle={{
        paddingLeft: theme.spacing.xl,
      }}
      renderLeadingIcon={() => (
        <View style={{ justifyContent: 'center' }}>
          <BaseIcon
            size={20}
            width={30}
            name={iconName}
            type={iconType}
            backgroundColor={color}
            containerStyle={{ borderRadius: BORDER_RADIUS.rounded }}
            color={theme.colors.white}
          />
        </View>
      )}
    />
  );
}

function SuccessToast({ ...rest }: RNToastProps) {
  const { theme } = useTheme();

  return (
    <BaseToast
      iconName="checkmark-sharp"
      iconType="ionicon"
      color={theme.colors.success}
      {...rest}
    />
  );
}

function ErrorToast({ ...rest }: RNToastProps) {
  const { theme } = useTheme();

  return (
    <BaseToast
      iconName="close-sharp"
      iconType="ionicon"
      color={theme.colors.error}
      {...rest}
    />
  );
}

function InfoToast({ ...rest }: RNToastProps) {
  const { theme } = useTheme();

  return (
    <BaseToast
      iconName="information-sharp"
      iconType="ionicon"
      color={theme.colors.blue}
      {...rest}
    />
  );
}

export { ErrorToast, InfoToast, SuccessToast };
