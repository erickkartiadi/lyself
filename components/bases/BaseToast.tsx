import { Icon, IconProps, useTheme } from '@rneui/themed';
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
import normalize from '../../utils/normalize';

interface BaseToastProps extends RNToastProps {
  color: string;
  icon: Pick<IconProps, 'name' | 'type'>;
}

function BaseToast({ color, icon: { name, type }, ...props }: BaseToastProps) {
  const { theme } = useTheme();

  const renderLeadingIcon = () => (
    <View style={{ justifyContent: 'center' }}>
      <Icon
        size={normalize(24)}
        name={name}
        type={type}
        backgroundColor={color}
        iconStyle={{
          padding: theme.spacing.sm,
        }}
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
        FONT.subtitle,
        { fontFamily: FONT_FAMILY.medium, color: theme.colors.black },
      ]}
      text2Style={[FONT.small, { color: theme.colors.grey3 }]}
      text2NumberOfLines={3}
      contentContainerStyle={{
        paddingLeft: theme.spacing.xl,
      }}
      renderLeadingIcon={renderLeadingIcon}
    />
  );
}

function SuccessToast({ ...props }: RNToastProps) {
  const { theme } = useTheme();

  return (
    <BaseToast
      icon={{
        name: 'checkmark',
        type: 'ionicon',
      }}
      color={theme.colors.success}
      {...props}
    />
  );
}

function ErrorToast({ ...props }: RNToastProps) {
  const { theme } = useTheme();

  return (
    <BaseToast
      icon={{
        name: 'close',
        type: 'material-community',
      }}
      color={theme.colors.error}
      {...props}
    />
  );
}

function InfoToast({ ...props }: RNToastProps) {
  const { theme } = useTheme();

  return (
    <BaseToast
      icon={{
        name: 'information',
        type: 'ionicon',
      }}
      color={theme.colors.blue}
      {...props}
    />
  );
}

export { ErrorToast, InfoToast, SuccessToast };
