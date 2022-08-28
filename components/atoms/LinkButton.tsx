import React from 'react';
import {
  NavigationAction,
  ParamListBase,
  useLinkProps,
} from '@react-navigation/native';
import { TextProps, TouchableOpacity } from 'react-native';
import { To } from '@react-navigation/native/lib/typescript/src/useLinkTo';
import { Text, useTheme } from '@rneui/themed';

interface LinkButtonProps<ParamList extends ReactNavigation.RootParamList> {
  to: To<ParamList>;
  color?: 'primary';
  action?: NavigationAction;
  children: React.ReactNode;
}

function LinkButton({
  to,
  action,
  children,
  color,
  ...rest
}: LinkButtonProps<ParamListBase> &
  TextProps & {
    children: React.ReactNode;
  }) {
  const { onPress, ...props } = useLinkProps({ to, action });
  const { theme } = useTheme();

  const colors = {
    primary: theme.colors.primary,
    default: theme.colors.blue,
  };

  return (
    <TouchableOpacity onPress={onPress} {...props} {...rest}>
      <Text
        subtitle2
        style={{
          color: color != null ? colors[color] : colors.default,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

LinkButton.defaultProps = {
  action: undefined,
  color: 'default',
};

export default LinkButton;
