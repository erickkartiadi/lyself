import { Button, Text, useTheme } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import axios from 'axios';
import { ResponseType, useAuthRequest } from 'expo-auth-session';
import BaseSearchBar from '../../components/BaseSearchBar';
import ActivityIcon, { Activities } from '../../components/ActivityIcon';
import { styles } from '../../theme';
import { ArticleCardProps, dataArticles } from '../../constant';
import ViewSeparator from '../../components/ViewSeparator';
import { ArticleCard } from '../../components/widget/Article';
import PlaylistCard, {
  PlaylistCardProps,
} from '../../components/widget/PlaylistCard';
import { ExploreRouteParamList } from '../../types/routes';
import AnimatedPressable from '../../components/AnimatedPressable';

export type ExplorePageProps = NativeStackScreenProps<
  ExploreRouteParamList,
  'Explore'
>;

const CLIENT_ID = '189bb29572b34ba29b2c243cae7f6105';
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

function ExplorePage({ navigation }: ExplorePageProps) {
  const { theme } = useTheme();
  const [token, setToken] = useState('');
  const [featuredPlaylist, setFeaturedPlaylist] = useState([]);

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

  const renderArticles = ({ item }: { item: ArticleCardProps }) => (
    <ArticleCard
      src={item.src}
      time={item.time}
      publisher={item.publisher}
      title={item.title}
      url={item.url}
    />
  );

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
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
      // redirectUri: 'lyself://',
      redirectUri: 'exp://192.168.1.110:19000',
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);

  useEffect(() => {
    if (token) {
      axios('https://api.spotify.com/v1/browse/featured-playlists', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        const { items } = res.data.playlists;
        setFeaturedPlaylist(items);
      });
    }
  });

  const activityMenu: Activities[] = [
    'consult',
    'meditation',
    'breathing',
    'music',
    'forum',
    'article',
    'todo',
    'other',
  ];

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: theme.spacing.xl,
        paddingTop: theme.spacing.lg,
      }}
    >
      <BaseSearchBar placeholder="Search tools, news or forum" />
      <View
        style={[
          styles.containerSection,
          styles.noContainerOffset,
          {
            marginTop: theme.spacing.lg,
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          },
        ]}
      >
        {activityMenu.map((activity) => (
          <View
            key={activity}
            style={{
              width: '25%',
            }}
          >
            <AnimatedPressable
              style={{
                alignItems: 'center',
                marginBottom: theme.spacing.xl * 1.25,
              }}
              onPress={() => navigation.navigate('Progress')}
            >
              <ActivityIcon activity={activity} />
              <Text
                subtitle2
                style={{
                  marginTop: theme.spacing.md,
                  textAlign: 'center',
                  textTransform: 'capitalize',
                }}
              >
                {activity}
              </Text>
            </AnimatedPressable>
          </View>
        ))}
      </View>
      <View style={styles.containerSection}>
        <Text h4>Popular articles</Text>
        <View style={styles.noContainerOffset}>
          <FlatList
            horizontal
            ItemSeparatorComponent={ViewSeparator}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
            data={dataArticles}
            renderItem={renderArticles}
            keyExtractor={(item: ArticleCardProps) => item.title}
          />
        </View>
      </View>
      <View style={styles.containerSection}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text h4>Featured playlist </Text>
          <ActivityIcon activity="music" size={24} iconFontSize={16} />
        </View>
        {token ? (
          <View style={styles.noContainerOffset}>
            <FlatList
              horizontal
              ItemSeparatorComponent={ViewSeparator}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.container}
              data={featuredPlaylist}
              renderItem={renderPlaylist}
              keyExtractor={(item: PlaylistCardProps) => item.id}
            />
          </View>
        ) : (
          <Button
            fullWidth
            title="Connect to Spotify"
            iconPosition="left"
            icon={{ type: 'fontisto', name: 'spotify' }}
            color={theme.colors.brand.spotify}
            onPress={() => promptAsync()}
            containerStyle={{ marginTop: theme.spacing.lg }}
          />
        )}
      </View>
    </ScrollView>
  );
}

export default ExplorePage;
