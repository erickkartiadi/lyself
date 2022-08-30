import { Button, useTheme } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { ResponseType, useAuthRequest } from 'expo-auth-session';
import BaseDivider from '../../components/bases/BaseDivider';
import BaseSearchBar from '../../components/bases/BaseSearchBar';
import { styles } from '../../theme/styles';
import Articles from '../../components/widget/Articles';
import PlaylistCard, {
  PlaylistCardProps,
} from '../../components/cards/PlaylistCard';
import ActivityButton from '../../components/ActivityButton';
import SectionTitle from '../../components/SectionTitle';
import { ExploreScreenNavigationProps } from '../../navigation/navigation.types';

const CLIENT_ID = '189bb29572b34ba29b2c243cae7f6105';
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

function ExploreScreen({ navigation }: ExploreScreenNavigationProps) {
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

  return (
    <ScrollView
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
          activity="consult"
          onPress={() =>
            navigation.navigate('ConsultStack', { screen: 'Consult' })
          }
        />
        <ActivityButton
          activity="meditation"
          onPress={() => navigation.navigate('InDevelopment')}
        />
        <ActivityButton
          activity="forum"
          onPress={() => navigation.navigate('InDevelopment')}
        />
        <ActivityButton
          activity="music"
          onPress={() => navigation.navigate('InDevelopment')}
        />
        <ActivityButton
          activity="todo"
          onPress={() => navigation.navigate('InDevelopment')}
        />
        <ActivityButton
          activity="breathing"
          onPress={() => navigation.navigate('InDevelopment')}
        />
        <ActivityButton
          activity="article"
          onPress={() => navigation.navigate('InDevelopment')}
        />
        <ActivityButton
          activity="other"
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
            ItemSeparatorComponent={BaseDivider}
            showsHorizontalScrollIndicator={false}
            style={styles.noContainerGutter}
            contentContainerStyle={styles.containerGutter}
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

export default ExploreScreen;
