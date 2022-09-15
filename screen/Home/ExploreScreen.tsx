import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_ID_KEY } from '@env';
import { Button, useTheme } from '@rneui/themed';
import { ResponseType, useAuthRequest } from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import ActivityButton from '../../components/ActivityButton';
import BaseSearchBar from '../../components/bases/BaseSearchBar';
import BaseViewSeparator from '../../components/bases/BaseViewSeparator';
import PlaylistCard from '../../components/cards/PlaylistCard';
import SectionTitle from '../../components/SectionTitle';
import Articles from '../../components/widget/Articles';
import getFeaturedPlaylist from '../../services/api/spotify';
import { styles } from '../../theme/styles';
import { ExploreScreenNavigationProps } from '../../types/navigation.types';
import { somethingWentWrongToast } from '../../utils/toast';

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

function ExploreScreen({ navigation }: ExploreScreenNavigationProps) {
  const { theme } = useTheme();
  const [token, setToken] = useState<string | null>('');
  const [featuredPlaylist, setFeaturedPlaylist] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const renderPlaylist = ({ item }: { item: any }) => {
    const { name, id } = item;
    const imageUrl = item.images[0].url;
    const creator = item.owner.display_name;
    const spotifyUrl = item.external_urls.spotify;
    return (
      <PlaylistCard
        key={id}
        id={id}
        title={name}
        imageUrl={imageUrl}
        creator={creator}
        spotifyUrl={spotifyUrl}
      />
    );
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: SPOTIFY_CLIENT_ID,
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

  const getSpotifyToken = async () => {
    const spotifyToken = await SecureStore.getItemAsync(SPOTIFY_CLIENT_ID_KEY);
    setToken(spotifyToken);
  };

  const getPlaylist = async () => {
    if (token) {
      try {
        const res = await getFeaturedPlaylist(token);
        const { items } = res.data.playlists;

        setFeaturedPlaylist(items);
      } catch (error) {
        somethingWentWrongToast();
      }
    }
  };

  useEffect(() => {
    if (response && response?.type === 'success') {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { access_token } = response.params;
      setToken(access_token);

      SecureStore.setItemAsync(SPOTIFY_CLIENT_ID_KEY, access_token);
    }
  }, [response]);

  useEffect(() => {
    getSpotifyToken();
    getPlaylist();
  }, [token]);

  const onRefresh = React.useCallback(async () => {
    setIsRefreshing(true);
    await getPlaylist();
    setIsRefreshing(false);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          colors={[theme.colors.primary]}
          onRefresh={onRefresh}
        />
      }
      contentContainerStyle={[styles.containerGutter, styles.section]}
    >
      <BaseSearchBar placeholder="Search tools, news or forum" />
      <View
        style={[
          styles.noContainerGutter,
          {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          },
        ]}
      >
        <ActivityButton
          activityType="consult"
          onPress={() => navigation.navigate('ConsultStack', { screen: 'Consult' })}
        />
        <ActivityButton
          activityType="meditation"
          onPress={() => navigation.navigate('InDevelopment')}
        />
        <ActivityButton
          activityType="forum"
          onPress={() => navigation.navigate('InDevelopment')}
        />
        <ActivityButton
          activityType="music"
          onPress={() => navigation.navigate('InDevelopment')}
        />
        <ActivityButton
          activityType="todo"
          onPress={() => navigation.navigate('InDevelopment')}
        />
        <ActivityButton
          activityType="breathing"
          onPress={() => navigation.navigate('InDevelopment')}
        />
        <ActivityButton
          activityType="article"
          onPress={() => navigation.navigate('InDevelopment')}
        />
        <ActivityButton
          activityType="other"
          onPress={() => navigation.navigate('InDevelopment')}
        />
      </View>
      <Articles />
      <View style={styles.section}>
        <SectionTitle title="Featured playlist" />
        {token ? (
          <FlatList
            horizontal
            overScrollMode="never"
            ItemSeparatorComponent={BaseViewSeparator}
            showsHorizontalScrollIndicator={false}
            style={styles.noContainerGutter}
            contentContainerStyle={styles.containerGutter}
            data={featuredPlaylist}
            renderItem={renderPlaylist}
          />
        ) : (
          <Button
            fullWidth
            title="Connect to Spotify"
            iconPosition="left"
            icon={{ type: 'fontisto', name: 'spotify' }}
            color={theme.colors.brand.spotify.green}
            onPress={() => promptAsync()}
            containerStyle={{ marginTop: theme.spacing.lg }}
          />
        )}
      </View>
    </ScrollView>
  );
}

export default ExploreScreen;
