import { Icon, Image, Text, useTheme } from '@rneui/themed';
import * as Linking from 'expo-linking';
import React from 'react';
import { View } from 'react-native';

import { BORDER_RADIUS } from '../../theme/styles';
import { Article } from '../../types/types';
import { formatTimeAgo } from '../../utils/formatTimeAgo';
import AnimatedPressable from '../AnimatedPressable';

function ArticleCard({ title, source, publishedAt, url, urlToImage }: Article) {
  const { theme } = useTheme();

  const handleOpenArticle = () => {
    Linking.openURL(url);
  };

  return (
    <AnimatedPressable
      style={{ width: 320, marginTop: theme.spacing.md }}
      onPress={handleOpenArticle}
    >
      <Image
        containerStyle={{
          width: '100%',
          aspectRatio: 4 / 3,
        }}
        borderRadius={BORDER_RADIUS.xl}
        source={{ uri: urlToImage }}
      />
      <View
        style={{
          marginTop: theme.spacing.xl,
        }}
      >
        <Text subtitle numberOfLines={3}>
          {title}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: theme.spacing.sm,
          }}
        >
          <Text caption style={{ color: theme.colors.grey3 }}>
            {source}
          </Text>
          <Icon type="entypo" name="dot-single" color={theme.colors.grey3} />
          <Text caption style={{ color: theme.colors.grey3 }}>
            {formatTimeAgo(publishedAt)}
          </Text>
        </View>
      </View>
    </AnimatedPressable>
  );
}

export default ArticleCard;
