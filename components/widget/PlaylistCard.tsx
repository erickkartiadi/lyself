import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { Image, Text, useTheme } from '@rneui/themed';
import * as Linking from 'expo-linking';
import axios from 'axios';
import BaseCard from '../BaseCard';

export interface PlaylistCardProps {
  id: string;
}

const ACCESS_TOKEN =
  'BQCLj9neBUZC8elXFzHnmD9ApHlATy7UQiPVGvinjHtrhKC2lyjxQVYUab6fK37fbzO00UCVVpC_N7rn5YTZb4Qk_DVG49FEhHR80jtMFp2AF4HddDD2kJbNA7F83Kt2UdGARs5K_hurf9PHU8MuKF-KHNjpjJszAN4GDkdXBT8Hl-xgtqu0Ywt8hVVAlL21_Ik';

function PlaylistCard({ id }: PlaylistCardProps) {
  const { theme } = useTheme();
  const [uri, setUri] = useState(
    'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80'
  );
  const [title, setTitle] = useState('');
  const [creator, setCreator] = useState('');

  const handleOpenSpotifyPlaylist = () => {
    Linking.openURL(`https://open.spotify.com/playlist/${id}`);
  };

  const getPlaylistImage = async () => {
    const res = await axios.get(
      `https://api.spotify.com/v1/playlists/${id}/images`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    setUri(res.data[0].url);
  };
  const getPlaylistInfo = async () => {
    const res = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const { name, owner } = res.data;
    setTitle(name);
    setCreator(owner.display_name);
  };

  const loadData = async () => {
    await getPlaylistInfo();
    await getPlaylistImage();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Pressable
      onPress={handleOpenSpotifyPlaylist}
      style={{ marginTop: theme.spacing.md }}
    >
      <BaseCard
        containerStyle={{
          width: 120,
          padding: 0,
          borderWidth: 0,
          elevation: 0.25,
          borderRadius: theme.spacing.lg,
          backgroundColor: theme.colors.cardBackground,
          overflow: 'hidden',
          marginBottom: theme.spacing.sm,
        }}
      >
        <Image
          containerStyle={{
            width: '100%',
            aspectRatio: 1,
          }}
          PlaceholderContent={<ActivityIndicator />}
          childrenContainerStyle={{ width: '100%' }}
          source={{
            uri,
          }}
        />
      </BaseCard>
      <View style={{ flex: 1, width: 120 }}>
        <Text h4>{title}</Text>
        <Text sm>by {creator}</Text>
      </View>
    </Pressable>
  );
}

export default PlaylistCard;
