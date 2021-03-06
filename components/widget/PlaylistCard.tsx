import React from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { Image, Text, useTheme } from '@rneui/themed';
import * as Linking from 'expo-linking';
import BaseCard from '../BaseCard';

export interface PlaylistCardProps {
  id: string;
  imageUrl: string;
  title: string;
  creator: string;
  spotifyUrl: string;
}

function PlaylistCard({
  id,
  imageUrl,
  title,
  creator,
  spotifyUrl,
}: PlaylistCardProps) {
  const { theme } = useTheme();

  const handleOpenSpotifyPlaylist = () => {
    Linking.openURL(spotifyUrl);
  };

  return (
    <Pressable
      key={id}
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
            uri: imageUrl,
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
