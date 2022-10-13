import { Button, useTheme } from '@rneui/themed';
import { useQuery } from '@tanstack/react-query';
import { ResponseType, useAuthRequest } from 'expo-auth-session';
import Constant from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { fetchAccessToken, fetchFeaturedPlaylist } from '../../services/api/spotify';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { Playlist } from '../../types/types';
import PlaylistCard from '../cards/PlaylistCard';
import { HorizontalSeparator } from '../layout/ItemSeparator';
import SectionTitle from '../layout/SectionTitle';

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};
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
      redirectUri: Constant?.manifest?.extra?.redirectUri,
    },
    discovery
  );

  useEffect(() => {
    if (response && response?.type === 'success') {
      fetchAccessToken(response.params.code);
    }
  }, [response]);

  return (
    <View style={layout.sectionLarge}>
      <SectionTitle title="Featured playlist" />
      {isSpotifyTokenAvailable ? (
        <FlatList
          horizontal
          overScrollMode="never"
          ItemSeparatorComponent={HorizontalSeparator}
          showsHorizontalScrollIndicator={false}
          style={layout.noContainerGutter}
          contentContainerStyle={layout.containerGutter}
          data={spotifyQuery.data}
          renderItem={renderPlaylist}
        />
      ) : (
        <Button
          title="Connect to Spotify"
          iconPosition="left"
          icon={{ type: 'fontisto', name: 'spotify' }}
          color={theme.colors.spotify}
          onPress={() => promptAsync()}
          containerStyle={spacing.mt_lg}
        />
      )}
    </View>
  );
}

export default SpotifySection;
