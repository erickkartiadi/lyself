import {
  Avatar as RNEAvatar,
  AvatarProps as RNEAvatarProps,
  makeStyles,
  useTheme,
} from '@rneui/themed';
import * as React from 'react';

import { GUTTER_SIZE } from '../../theme/theme';
import normalize from '../../utils/normalize';

interface AvatarProps extends RNEAvatarProps {
  size?: number;
  avatarUrl?: string | null;
}

const useStyles = makeStyles((theme) => ({
  avatarContainer: {
    overflow: 'hidden',
    borderWidth: 0.25,
    borderColor: theme.colors.grey5,
  },
}));

function Avatar({
  size = 3,
  rounded,
  containerStyle,
  avatarUrl: photoUrl,
  ...props
}: AvatarProps) {
  const { theme } = useTheme();

  const styles = useStyles();

  if (photoUrl) {
    return (
      <RNEAvatar
        size={normalize(size * GUTTER_SIZE)}
        {...props}
        rounded
        source={{
          uri: photoUrl,
        }}
        containerStyle={[styles.avatarContainer, containerStyle]}
      />
    );
  }
  return (
    <RNEAvatar
      size={normalize(size * GUTTER_SIZE)}
      {...props}
      rounded
      icon={{
        name: 'person',
        type: 'ionicon',
        color: theme.colors.grey3,
      }}
      containerStyle={[
        styles.avatarContainer,
        containerStyle,
        { backgroundColor: theme.colors.secondary },
      ]}
    />
  );
}

Avatar.defaultProps = {
  size: 3,
  avatarUrl: null,
};

export default Avatar;
