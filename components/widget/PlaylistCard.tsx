import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Image, Text, useTheme } from '@rneui/themed';
import * as Linking from 'expo-linking';
import AnimatedPressable from '../AnimatedPressable';
import { BORDER_RADIUS } from '../../theme/styles';

export interface PlaylistCardProps {
  imageUrl: string;
  title: string;
  creator: string;
  spotifyUrl: string;
  id: string;
}

function PlaylistCard({
  imageUrl,
  id,
  title,
  creator,
  spotifyUrl,
}: PlaylistCardProps) {
  const { theme } = useTheme();

  const handleOpenSpotifyPlaylist = () => {
    Linking.openURL(spotifyUrl);
  };

  return (
    <AnimatedPressable
      key={id}
      onPress={handleOpenSpotifyPlaylist}
      style={{ marginTop: theme.spacing.md, width: 160 }}
    >
      <Image
        containerStyle={{
          width: '100%',
          aspectRatio: 1,
          borderRadius: BORDER_RADIUS.md,
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
  );
}

export default PlaylistCard;
