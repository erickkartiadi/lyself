import { Image, Text } from '@rneui/themed';
import * as Linking from 'expo-linking';
import * as React from 'react';
import { View } from 'react-native';

import border from '../../styles/border';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import { Playlist } from '../../types/types';
import useStyles from '../../utils/hooks/useStyles';
import AnimatedPressable from '../base/AnimatedPressable';

function PlaylistCard({ imageUrl, id, name, creator, spotifyUrl }: Playlist) {
  const handleOpenSpotifyPlaylist = () => {
    Linking.openURL(spotifyUrl);
  };

  const styles = useStyles();

  return (
    <AnimatedPressable
      key={id}
      onPress={handleOpenSpotifyPlaylist}
      style={[spacing.mt_md, { width: SIZING['11xl'] }]}
    >
      <Image
        containerStyle={[layout.w100, border.radius_xl, layout.aspectRatioSquare]}
        childrenContainerStyle={layout.w100}
        source={{
          uri: imageUrl,
        }}
      />
      <View style={spacing.mt_md}>
        <Text subtitle2>{name}</Text>
        <Text caption style={styles.textGrey}>
          by {creator}
        </Text>
      </View>
    </AnimatedPressable>
  );
}

export default PlaylistCard;
