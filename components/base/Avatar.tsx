import {
  Avatar as RNEAvatar,
  AvatarProps as RNEAvatarProps,
  useTheme,
} from '@rneui/themed';
import * as React from 'react';

import { BORDER_RADIUS, GUTTER_SIZE } from '../../theme/styles';
import normalize from '../../utils/normalize';

interface AvatarProps extends RNEAvatarProps {
  rounded?: boolean;
  size?: number;
}

function Avatar({ size = 3, rounded, containerStyle, ...props }: AvatarProps) {
  const { theme } = useTheme();

  return (
    <RNEAvatar
      size={normalize(size * GUTTER_SIZE)}
      {...props}
      containerStyle={[
        {
          overflow: 'hidden',
          borderWidth: 0.25,
          borderColor: theme.colors.grey5,
          borderRadius: rounded ? BORDER_RADIUS.rounded : BORDER_RADIUS.md,
        },
        containerStyle,
      ]}
    />
  );
}

Avatar.defaultProps = {
  rounded: false,
  size: 3,
};

export default Avatar;
