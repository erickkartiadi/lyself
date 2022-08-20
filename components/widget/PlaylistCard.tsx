import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Image, Text, useTheme } from '@rneui/themed';
import * as Linking from 'expo-linking';
import AnimatedPressable from '../AnimatedPressable';

export interface PlaylistCardProps {
  imageUrl: string;
  title: string;
  creator: string;
  spotifyUrl: string;
}

function PlaylistCard({
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
    // <Pressable
    //   onPress={handleOpenSpotifyPlaylist}
    //   style={{ marginTop: theme.spacing.md, flex: 1 }}
    // >
    <AnimatedPressable
      onPress={handleOpenSpotifyPlaylist}
      style={{ marginTop: theme.spacing.md, width: 160 }}
    >
      <Image
        containerStyle={{
          width: '100%',
          aspectRatio: 1,
          borderRadius: theme.spacing.md,
        }}
        PlaceholderContent={<ActivityIndicator />}
        childrenContainerStyle={{ width: '100%' }}
        source={{
          uri: imageUrl,
        }}
      />
      <View style={{ marginTop: theme.spacing.md }}>
        <Text subtitle1>{title}</Text>
        <Text caption>by {creator}</Text>
      </View>
    </AnimatedPressable>
    // </Pressable>
  );
}

export default PlaylistCard;
