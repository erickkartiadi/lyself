import { Image, Text, useTheme } from '@rneui/themed';
import * as Linking from 'expo-linking';
import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { BORDER_RADIUS } from '../../theme/styles';
import { Playlist } from '../../types/types';
import AnimatedPressable from '../AnimatedPressable';

function PlaylistCard({ imageUrl, id, name: title, creator, spotifyUrl }: Playlist) {
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
          borderRadius: BORDER_RADIUS.md,
        }}
        PlaceholderContent={<ActivityIndicator />}
        childrenContainerStyle={{ width: '100%' }}
        source={{
          uri: imageUrl,
        }}
      />
      <View style={{ marginTop: theme.spacing.md }}>
        <Text subtitle>{title}</Text>
        <Text caption>by {creator}</Text>
      </View>
    </AnimatedPressable>
  );
}

export default PlaylistCard;
