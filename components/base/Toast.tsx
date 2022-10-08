import { Icon, IconProps, useTheme } from '@rneui/themed';
import * as React from 'react';
import { Dimensions, View } from 'react-native';
import {
  BaseToast as RNToast,
  BaseToastProps as RNToastProps,
} from 'react-native-toast-message';

import appStyles from '../../theme/appStyles';
import spacing from '../../theme/spacing';
import { BORDER_RADIUS, FONT, FONT_FAMILY, GUTTER_SIZE } from '../../theme/theme';
import normalize from '../../utils/normalize';

interface ToastProps extends RNToastProps {
  color: string;
  icon: Pick<IconProps, 'name' | 'type'>;
}

function Toast({ color, icon: { name, type }, ...props }: ToastProps) {
  const { theme } = useTheme();

  const renderLeadingIcon = () => (
    <View style={{ justifyContent: 'center' }}>
      <Icon
        size={normalize(24)}
        name={name}
        type={type}
        backgroundColor={color}
        iconStyle={spacing.p_md}
        containerStyle={{
          borderRadius: BORDER_RADIUS.rounded,
        }}
        color={theme.colors.white}
      />
    </View>
  );

  return (
    <RNToast
      {...props}
      style={[
        appStyles.shadowLarge,
        spacing.py_xl,
        spacing.px_xl,
        {
          borderRadius: BORDER_RADIUS.md,
          backgroundColor: theme.colors.cardBackground,
          borderLeftWidth: theme.spacing.sm,
          borderLeftColor: color,
          width: Dimensions.get('window').width - GUTTER_SIZE * 2,
          height: '100%',
        },
      ]}
      text1Style={[
        FONT.subtitle,
        { fontFamily: FONT_FAMILY.medium, color: theme.colors.black },
      ]}
      text2Style={[FONT.small, { color: theme.colors.grey3 }]}
      text2NumberOfLines={3}
      contentContainerStyle={spacing.pl_xl}
      renderLeadingIcon={renderLeadingIcon}
    />
  );
}

export function SuccessToast({ ...props }: RNToastProps) {
  const { theme } = useTheme();

  return (
    <Toast
      icon={{
        name: 'checkmark',
        type: 'ionicon',
      }}
      color={theme.colors.success}
      {...props}
    />
  );
}

export function ErrorToast({ ...props }: RNToastProps) {
  const { theme } = useTheme();

  return (
    <Toast
      icon={{
        name: 'close',
        type: 'material-community',
      }}
      color={theme.colors.error}
      {...props}
    />
  );
}

export function InfoToast({ ...props }: RNToastProps) {
  const { theme } = useTheme();

  return (
    <Toast
      icon={{
        name: 'information',
        type: 'ionicon',
      }}
      color={theme.colors.blue}
      {...props}
    />
  );
}
