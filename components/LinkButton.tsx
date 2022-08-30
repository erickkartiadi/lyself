import React from 'react';
import {
  NavigationAction,
  ParamListBase,
  useLinkProps,
} from '@react-navigation/native';
import { TextProps } from 'react-native';
import { To } from '@react-navigation/native/lib/typescript/src/useLinkTo';
import BaseLink, { BaseLinkProps } from './bases/BaseLink';

interface LinkButtonProps<ParamList extends ReactNavigation.RootParamList> {
  to: To<ParamList>;
  action?: NavigationAction;
}

function LinkButton({
  to,
  action,
  children,
  ...rest
}: LinkButtonProps<ParamListBase> & TextProps & BaseLinkProps) {
  const { onPress, ...props } = useLinkProps({ to, action });

  return (
    <BaseLink onPress={onPress} {...props} {...rest}>
      {children}
    </BaseLink>
  );
}

LinkButton.defaultProps = {
  action: undefined,
};

export default LinkButton;
