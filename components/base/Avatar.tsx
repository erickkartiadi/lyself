import {
  Avatar as RNEAvatar,
  AvatarProps as RNEAvatarProps,
  useTheme,
} from '@rneui/themed';
import * as React from 'react';

import border from '../../styles/border';
import useStyles from '../../utils/hooks/useStyles';

interface AvatarProps extends React.PropsWithChildren<RNEAvatarProps> {
  avatarUrl?: string | null;
}

function Avatar({ rounded, containerStyle, avatarUrl: photoUrl, ...props }: AvatarProps) {
  const { theme } = useTheme();

  const styles = useStyles();
  const avatarStyle = [styles.borderGrey5, border.width_xs, containerStyle];

  if (photoUrl) {
    return (
      <RNEAvatar
        {...props}
        rounded
        source={{
          uri: photoUrl,
        }}
        containerStyle={[avatarStyle]}
      />
    );
  }
  return (
    <RNEAvatar
      {...props}
      rounded
      icon={{
        name: 'person',
        type: 'ionicon',
        color: theme.colors.grey3,
      }}
      containerStyle={[styles.secondaryBackground, avatarStyle]}
    />
  );
}

Avatar.defaultProps = {
  avatarUrl: null,
};

export default Avatar;
