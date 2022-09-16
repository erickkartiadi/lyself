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
import ArticleCard from '../../components/cards/ArticleCard';
import PlaylistCard from '../../components/cards/PlaylistCard';
import SectionTitle from '../../components/SectionTitle';
import getArticles from '../../services/api/news';
import getFeaturedPlaylist from '../../services/api/spotify';
import { styles } from '../../theme/styles';
import { ExploreScreenNavigationProps } from '../../types/navigation.types';
import { Article, Playlist } from '../../types/types';
import { somethingWentWrongToast } from '../../utils/toast';

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

const renderArticles = ({ item }: { item: Article }) => (
  <ArticleCard
    url={item.url}
    publishedAt={item.publishedAt}
    source={item.source}
    title={item.title}
    urlToImage={item.urlToImage}
  />
);

function ExploreScreen({ navigation }: ExploreScreenNavigationProps) {
  const { theme } = useTheme();
  const [token, setToken] = useState<string | null>('');
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const loadPlaylist = async () => {
    if (token) {
      try {
        const res = await getFeaturedPlaylist(token);
        const data: Playlist[] = res.data.playlists.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          imageUrl: item.images[0].url,
          creator: item.owner.display_name,
          spotifyUrl: item.external_urls.spotify,
        }));

        setPlaylists(data);
      } catch (error) {
        somethingWentWrongToast();
      }
    }
  };

  const loadArticles = async () => {
    const res = await getArticles();

    const data = res.data.articles.map((article: any) => ({
      title: article.title,
      source: article.source.name,
      url: article.url,
      publishedAt: article.publishedAt,
      urlToImage: article.urlToImage,
    }));

    setArticles(data);
  };

  useEffect(() => {
    if (response && response?.type === 'success') {
      const accessToken = response.params.access_token;
      setToken(accessToken);

      SecureStore.setItemAsync(SPOTIFY_CLIENT_ID_KEY, accessToken);
    }
  }, [response]);

  useEffect(() => {
    getSpotifyToken();
    loadPlaylist();
    loadArticles();
  }, [token]);

  const onRefresh = React.useCallback(async () => {
    setIsRefreshing(true);
    await loadPlaylist();
    await loadArticles();
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
      <View style={styles.section}>
        <SectionTitle title="News about mental health" showRightComponent />
        <FlatList
          overScrollMode="never"
          horizontal
          ItemSeparatorComponent={BaseViewSeparator}
          showsHorizontalScrollIndicator={false}
          style={[styles.noContainerGutter, styles.flatListHorizontal]}
          contentContainerStyle={[
            styles.containerGutter,
            styles.flatListHorizontalContainer,
          ]}
          data={articles}
          renderItem={renderArticles}
        />
      </View>
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
            data={playlists}
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
