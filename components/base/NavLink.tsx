import { NavigationAction, ParamListBase, useLinkProps } from '@react-navigation/native';
import { To } from '@react-navigation/native/lib/typescript/src/useLinkTo';
import React from 'react';

import ButtonLink, { ButtonLinkProps } from './Link';

interface NavLinkProps<ParamList extends ReactNavigation.RootParamList>
  extends ButtonLinkProps {
  to: To<ParamList>;
  action?: NavigationAction;
}

function NavLink({ to, action, children, ...props }: NavLinkProps<ParamListBase>) {
  const { onPress, ...linkProps } = useLinkProps({ to, action });

  return (
    <ButtonLink onPress={onPress} {...linkProps} {...props}>
      {children}
    </ButtonLink>
  );
}

NavLink.defaultProps = {
  action: undefined,
};

export default NavLink;
