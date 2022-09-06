import { NavigationAction, ParamListBase, useLinkProps } from '@react-navigation/native';
import { To } from '@react-navigation/native/lib/typescript/src/useLinkTo';
import React from 'react';

import BaseLink, { BaseLinkProps } from './bases/BaseLink';

interface LinkButtonProps<ParamList extends ReactNavigation.RootParamList>
  extends BaseLinkProps {
  to: To<ParamList>;
  action?: NavigationAction;
}

function LinkButton({ to, action, children, ...rest }: LinkButtonProps<ParamListBase>) {
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
