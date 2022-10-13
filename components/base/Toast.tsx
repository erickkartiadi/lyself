import { Icon, IconProps, useTheme } from '@rneui/themed';
import * as React from 'react';
import { Dimensions, View } from 'react-native';
import {
  BaseToast as RNToast,
  BaseToastProps as RNToastProps,
} from 'react-native-toast-message';

import border from '../../styles/border';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { small, subtitle } from '../../styles/typhography';
import { GUTTER_SIZE, SIZING } from '../../theme/theme';
import useStyles from '../../utils/hooks/useStyles';

interface ToastProps extends RNToastProps {
  color: string;
  icon: Pick<IconProps, 'name' | 'type'>;
}

function Toast({ color, icon: { name, type }, ...props }: ToastProps) {
  const { theme } = useTheme();
  const styles = useStyles();

  const renderLeadingIcon = () => (
    <View style={{ justifyContent: 'center' }}>
      <Icon
        size={SIZING['3xl']}
        name={name}
        type={type}
        backgroundColor={color}
        iconStyle={spacing.p_sm}
        containerStyle={border.rounded}
        color={theme.colors.white}
      />
    </View>
  );

  return (
    <RNToast
      {...props}
      style={[
        spacing.py_xl,
        spacing.px_xl,
        border.radius_lg,
        border.left_width_2xl,
        layout.h100,
        styles.cardBackground,
        {
          borderLeftColor: color,
          width: Dimensions.get('window').width - GUTTER_SIZE * 2,
        },
      ]}
      text1Style={[subtitle, styles.textBlack]}
      text2Style={[small, styles.textGrey]}
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
