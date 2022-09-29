import { Image, Skeleton, Text, useTheme } from '@rneui/themed';
import * as Linking from 'expo-linking';
import * as React from 'react';
import { View } from 'react-native';

import { BORDER_RADIUS } from '../../theme/styles';
import { Playlist } from '../../types/types';
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
      style={{ marginTop: theme.spacing.md, width: 160 }}
    >
      <Image
        containerStyle={{
          width: '100%',
          aspectRatio: 1,
          borderRadius: BORDER_RADIUS.xl,
        }}
        childrenContainerStyle={{ width: '100%' }}
        source={{
          uri: imageUrl,
        }}
      />
      <View style={{ marginTop: theme.spacing.md }}>
        <Text subtitle2>{name}</Text>
        <Text caption color={theme.colors.grey3} style={{ marginTop: theme.spacing.sm }}>
          by {creator}
        </Text>
      </View>
    </AnimatedPressable>
  );
}

export default PlaylistCard;

export function PlaylistCardPlaceholder() {
  const { theme } = useTheme();

  return (
    <View style={{ marginTop: theme.spacing.md }}>
      <Skeleton height={160} width={160} style={{ borderRadius: BORDER_RADIUS.lg }} />
      <Skeleton style={{ marginTop: theme.spacing.lg }} height={16} />
      <Skeleton style={{ marginTop: theme.spacing.sm }} height={16} width={120} />
    </View>
  );
}
