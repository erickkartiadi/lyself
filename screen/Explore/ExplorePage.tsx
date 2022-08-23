import { Button, Text, useTheme } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import axios from 'axios';
import { ResponseType, useAuthRequest } from 'expo-auth-session';
import BaseSearchBar from '../../components/BaseSearchBar';
import ActivityIcon, { Activities } from '../../components/ActivityIcon';
import { styles } from '../../theme';
import ViewSeparator from '../../components/ViewSeparator';
import { ArticleWidget } from '../../components/widget/Article';
import PlaylistCard, {
  PlaylistCardProps,
} from '../../components/widget/PlaylistCard';
import { ExploreRouteParamList } from '../../types/routes';
import ActivityMenu from '../../components/ActivityMenu';

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

  const menus: {
    activity: Activities;
    route: keyof ExploreRouteParamList;
  }[] = [
    { activity: 'consult', route: 'Consult' },
    { activity: 'meditation', route: 'InDevelopment' },
    { activity: 'forum', route: 'InDevelopment' },
    { activity: 'music', route: 'InDevelopment' },
    { activity: 'todo', route: 'InDevelopment' },
    { activity: 'breathing', route: 'InDevelopment' },
    { activity: 'article', route: 'InDevelopment' },
    { activity: 'other', route: 'InDevelopment' },
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
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          },
        ]}
      >
        {menus.map(({ activity, route }) => (
          <ActivityMenu
            key={activity}
            activity={activity}
            onPress={() => navigation.navigate(route)}
          />
        ))}
      </View>
      <ArticleWidget />
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
          <FlatList
            horizontal
            ItemSeparatorComponent={ViewSeparator}
            showsHorizontalScrollIndicator={false}
            style={styles.flatListContainer}
            contentContainerStyle={styles.flatList}
            data={featuredPlaylist}
            renderItem={renderPlaylist}
            keyExtractor={(item: PlaylistCardProps) => item.id}
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

export default ExplorePage;
