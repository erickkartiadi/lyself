import { Avatar, AvatarProps, useTheme } from '@rneui/themed';
import colorAlpha from 'color-alpha';
import * as React from 'react';

import { BORDER_RADIUS, GUTTER_SIZE } from '../../theme/styles';

interface BaseAvatarProps extends AvatarProps {
  rounded?: boolean;
  size?: number;
}

function BaseAvatar({
  size = 3,
  rounded,
  containerStyle,
  ...rest
}: BaseAvatarProps) {
  const { theme } = useTheme();

  return (
    <Avatar
      size={size * GUTTER_SIZE}
      {...rest}
      containerStyle={[
        {
          overflow: 'hidden',
          borderWidth: 0.5,
          borderColor: colorAlpha(theme.colors.black, 0.5),
          borderRadius: rounded ? BORDER_RADIUS.rounded : BORDER_RADIUS.md,
        },
        containerStyle,
      ]}
    />
  );
}

// TODO refactor default props
BaseAvatar.defaultProps = {
  rounded: false,
  size: 3,
};

export default BaseAvatar;
