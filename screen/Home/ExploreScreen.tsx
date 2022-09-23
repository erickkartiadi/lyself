import { SPOTIFY_CLIENT_ID, SPOTIFY_EXPIRES_TIME_KEY } from '@env';
import { Button, useTheme } from '@rneui/themed';
import { ResponseType, useAuthRequest } from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import ActivityButton from '../../components/ActivityButton';
import BaseSearchBar from '../../components/bases/BaseSearchBar';
import BaseViewSeparator from '../../components/bases/BaseViewSeparator';
import ArticleCard from '../../components/cards/ArticleCard';
import PlaylistCard from '../../components/cards/PlaylistCard';
import ArticleCardPlaceholder from '../../components/placeholder/ArticleCardPlaceholder';
import PlaylistCardPlaceholder from '../../components/placeholder/PlaylistCardPlaceholder';
import RefreshControl from '../../components/placeholder/RefreshControl';
import SectionTitle from '../../components/SectionTitle';
import getArticles from '../../services/api/news';
import {
  fetchAccessToken,
  fetchFeaturedPlaylist,
  fetchRefreshToken,
} from '../../services/api/spotify';
import { styles } from '../../theme/styles';
import { ExploreScreenNavigationProps } from '../../types/navigation.types';
import { Article, Playlist } from '../../types/types';

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

const renderEmptyArticles = () => (
  <View style={{ width: '100%', flexDirection: 'row' }}>
    <ArticleCardPlaceholder />
    <BaseViewSeparator />
    <ArticleCardPlaceholder />
    <BaseViewSeparator />
    <ArticleCardPlaceholder />
  </View>
);

const renderEmptyPlaylists = () => (
  <View style={{ width: '100%', flexDirection: 'row' }}>
    <PlaylistCardPlaceholder />
    <BaseViewSeparator />
    <PlaylistCardPlaceholder />
    <BaseViewSeparator />
    <PlaylistCardPlaceholder />
    <BaseViewSeparator />
    <PlaylistCardPlaceholder />
  </View>
);

function ExploreScreen({ navigation }: ExploreScreenNavigationProps) {
  const { theme } = useTheme();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSpotifyTokenAvailable, setIsSpotifyTokenAvailable] = useState(false);

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Code,
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

  const loadPlaylist = async () => {
    const tokenExpirationTime = await SecureStore.getItemAsync(SPOTIFY_EXPIRES_TIME_KEY);
    const isTokenExpired =
      !tokenExpirationTime ||
      new Date().getTime() > parseInt(tokenExpirationTime || '0', 10);

    try {
      if (isTokenExpired) {
        await fetchRefreshToken();
        await loadPlaylist();
      } else {
        setIsSpotifyTokenAvailable(true);
        const res = await fetchFeaturedPlaylist();
        const data: Playlist[] = res.data.playlists.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          imageUrl: item.images[0].url,
          creator: item.owner.display_name,
          spotifyUrl: item.external_urls.spotify,
        }));
        setPlaylists(data);
      }
    } catch (error) {
      // somethingWentWrongToast();
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
      fetchAccessToken(response.params.code);
    }
  }, [response]);

  useEffect(() => {
    (async () => {
      await loadArticles();
      await loadPlaylist();
    })();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setIsRefreshing(true);
    await loadArticles();
    await loadPlaylist();
    setIsRefreshing(false);
  }, []);

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
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
          activityType="stories"
          onPress={() => navigation.navigate('InDevelopment')}
        />
        <ActivityButton
          activityType="meditation"
          onPress={() => navigation.navigate('InDevelopment')}
        />
        <ActivityButton
          activityType="breathing"
          onPress={() => navigation.navigate('InDevelopment')}
        />
        <ActivityButton
          activityType="todo"
          onPress={() => navigation.navigate('TodoStack', { screen: 'Todo' })}
        />
        <ActivityButton
          activityType="music"
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
        <SectionTitle title="Articles about mental health" showRightComponent />
        <FlatList
          overScrollMode="never"
          horizontal
          ListEmptyComponent={renderEmptyArticles}
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
        {isSpotifyTokenAvailable ? (
          <FlatList
            horizontal
            overScrollMode="never"
            ItemSeparatorComponent={BaseViewSeparator}
            showsHorizontalScrollIndicator={false}
            style={styles.noContainerGutter}
            contentContainerStyle={styles.containerGutter}
            data={playlists}
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
    </ScrollView>
  );
}

export default ExploreScreen;
