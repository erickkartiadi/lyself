import { SPOTIFY_CLIENT_ID } from '@env';
import { Button, useTheme } from '@rneui/themed';
import { useQuery } from '@tanstack/react-query';
import { ResponseType, useAuthRequest } from 'expo-auth-session';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';

import ActivityButton from '../../components/ActivityButton';
import BaseSearchBar from '../../components/bases/BaseSearchBar';
import BaseViewSeparator from '../../components/bases/BaseViewSeparator';
import ArticleCard from '../../components/cards/ArticleCard';
import PlaylistCard from '../../components/cards/PlaylistCard';
import ArticleCardPlaceholder from '../../components/placeholder/ArticleCardPlaceholder';
import PlaylistCardPlaceholder from '../../components/placeholder/PlaylistCardPlaceholder';
import RefreshControl from '../../components/placeholder/RefreshControl';
import SectionTitle from '../../components/SectionTitle';
import fetchNews from '../../services/api/news';
import { fetchAccessToken, fetchFeaturedPlaylist } from '../../services/api/spotify';
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
  const [isSpotifyTokenAvailable, setIsSpotifyTokenAvailable] = useState(false);

  const articlesQuery = useQuery<Article[]>(['articles'], fetchNews);
  const spotifyQuery = useQuery<Playlist[]>(['playlist'], fetchFeaturedPlaylist, {
    onSuccess: () => setIsSpotifyTokenAvailable(true),
  });

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

  useEffect(() => {
    if (response && response?.type === 'success') {
      fetchAccessToken(response.params.code);
    }
  }, [response]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={articlesQuery.isFetching || spotifyQuery.isFetching}
          onRefresh={async () => {
            await articlesQuery.refetch();
            await spotifyQuery.refetch();
          }}
        />
      }
      contentContainerStyle={[styles.containerGutter, styles.sectionLarge]}
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
      <View style={styles.sectionLarge}>
        <SectionTitle title="Articles about mental health" showRightComponent />
        <FlatList
          overScrollMode="never"
          horizontal
          ListEmptyComponent={renderEmptyArticles}
          ItemSeparatorComponent={BaseViewSeparator}
          showsHorizontalScrollIndicator={false}
          style={[styles.noContainerGutter]}
          contentContainerStyle={[styles.containerGutter]}
          data={articlesQuery.data}
          renderItem={renderArticles}
        />
      </View>
      <View style={styles.sectionLarge}>
        <SectionTitle title="Featured playlist" />
        {isSpotifyTokenAvailable ? (
          <FlatList
            horizontal
            overScrollMode="never"
            ItemSeparatorComponent={BaseViewSeparator}
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
    </ScrollView>
  );
}

export default ExploreScreen;
