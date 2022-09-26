import { Avatar, AvatarProps, useTheme } from '@rneui/themed';
import * as React from 'react';

import { BORDER_RADIUS, GUTTER_SIZE } from '../../theme/styles';

interface BaseAvatarProps extends AvatarProps {
  rounded?: boolean;
  size?: number;
}

function BaseAvatar({ size = 3, rounded, containerStyle, ...props }: BaseAvatarProps) {
  const { theme } = useTheme();

  return (
    <Avatar
      size={size * GUTTER_SIZE}
      {...props}
      containerStyle={[
        {
          overflow: 'hidden',
          borderWidth: 0.5,
          borderColor: theme.colors.greyOutline,
          borderRadius: rounded ? BORDER_RADIUS.rounded : BORDER_RADIUS.md,
        },
        containerStyle,
      ]}
    />
  );
}

BaseAvatar.defaultProps = {
  rounded: false,
  size: 3,
};

export default BaseAvatar;
