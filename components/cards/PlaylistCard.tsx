import { Image, Skeleton, Text, useTheme } from '@rneui/themed';
import * as Linking from 'expo-linking';
import * as React from 'react';
import { View } from 'react-native';

import appStyles from '../../theme/appStyles';
import spacing from '../../theme/spacing';
import { BORDER_RADIUS } from '../../theme/theme';
import { Playlist } from '../../types/types';
import normalize from '../../utils/normalize';
import AnimatedPressable from '../base/AnimatedPressable';

function PlaylistCard({ imageUrl, id, name, creator, spotifyUrl }: Playlist) {
  const { theme } = useTheme();

  const handleOpenSpotifyPlaylist = () => {
    Linking.openURL(spotifyUrl);
  };

  return (
    <AnimatedPressable
      key={id}
      onPress={handleOpenSpotifyPlaylist}
      style={[spacing.mt_md, { width: normalize(160) }]}
    >
      <Image
        containerStyle={[
          appStyles.w100,
          {
            aspectRatio: 1,
            borderRadius: BORDER_RADIUS.xl,
          },
        ]}
        childrenContainerStyle={{ width: '100%' }}
        source={{
          uri: imageUrl,
        }}
      />
      <View style={spacing.mt_md}>
        <Text subtitle2>{name}</Text>
        <Text caption color={theme.colors.grey3} style={spacing.mt_sm}>
          by {creator}
        </Text>
      </View>
    </AnimatedPressable>
  );
}

export default PlaylistCard;

export function PlaylistCardPlaceholder() {
  return (
    <View style={spacing.mt_md}>
      <Skeleton
        height={normalize(160)}
        width={normalize(160)}
        style={{ borderRadius: BORDER_RADIUS.lg }}
      />
      <Skeleton style={spacing.mt_lg} height={16} />
      <Skeleton style={spacing.mt_sm} height={16} width={120} />
    </View>
  );
}
