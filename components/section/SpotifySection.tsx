import { Button, useTheme } from '@rneui/themed';
import { useQuery } from '@tanstack/react-query';
import { ResponseType, useAuthRequest } from 'expo-auth-session';
import { discovery } from 'expo-auth-session/build/providers/Google';
import Constant from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { fetchAccessToken, fetchFeaturedPlaylist } from '../../services/api/spotify';
import { styles } from '../../theme/styles';
import { Playlist } from '../../types/types';
import PlaylistCard, { PlaylistCardPlaceholder } from '../cards/PlaylistCard';
import HorizontalSeparator from '../layout/HorizontalSeparator';
import SectionTitle from '../layout/SectionTitle';

const renderEmptyPlaylists = () => (
  <View style={{ width: '100%', flexDirection: 'row' }}>
    <PlaylistCardPlaceholder />
    <HorizontalSeparator />
    <PlaylistCardPlaceholder />
    <HorizontalSeparator />
    <PlaylistCardPlaceholder />
    <HorizontalSeparator />
    <PlaylistCardPlaceholder />
  </View>
);

const renderPlaylist = ({
  item: { creator, id, imageUrl, spotifyUrl, name: title },
}: {
  item: Playlist;
}) => (
  <PlaylistCard
    key={id}
    id={id}
    name={title}
    imageUrl={imageUrl}
    creator={creator}
    spotifyUrl={spotifyUrl}
  />
);
function SpotifySection() {
  const { theme } = useTheme();
  const [isSpotifyTokenAvailable, setIsSpotifyTokenAvailable] = useState(false);

  const spotifyQuery = useQuery<Playlist[]>(['playlist'], fetchFeaturedPlaylist, {
    onSuccess: () => setIsSpotifyTokenAvailable(true),
  });

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Code,
      clientId: Constant?.manifest?.extra?.spotifyClientId,
      scopes: [
        'user-read-currently-playing',
        'user-read-recently-played',
        'user-read-playback-state',
        'user-top-read',
        'user-modify-playback-state',
        'streaming',
        'user-read-email',
        'user-read-private',
      ],
      usePKCE: false,
      redirectUri: 'exp://192.168.1.110:19000',
    },
    discovery
  );

  useEffect(() => {
    if (response && response?.type === 'success') {
      fetchAccessToken(response.params.code);
    }
  }, [response]);

  return (
    <View style={styles.sectionLarge}>
      <SectionTitle title="Featured playlist" />
      {isSpotifyTokenAvailable ? (
        <FlatList
          horizontal
          overScrollMode="never"
          ItemSeparatorComponent={HorizontalSeparator}
          showsHorizontalScrollIndicator={false}
          style={styles.noContainerGutter}
          contentContainerStyle={styles.containerGutter}
          data={spotifyQuery.data}
          renderItem={renderPlaylist}
          ListEmptyComponent={renderEmptyPlaylists}
        />
      ) : (
        <Button
          fullWidth
          title="Connect to Spotify"
          iconPosition="left"
          icon={{ type: 'fontisto', name: 'spotify' }}
          color={theme.colors.spotify}
          onPress={() => promptAsync()}
          containerStyle={{ marginTop: theme.spacing.lg }}
        />
      )}
    </View>
  );
}

export default SpotifySection;
