import { Icon, Image, Text, useTheme } from '@rneui/themed';
import * as Linking from 'expo-linking';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Article } from '../../types/types';
import formatTimeAgo from '../../utils/formatTimeAgo';
import BaseCard from '../bases/BaseCard';

function ArticleCard({ title, source, publishedAt, url, urlToImage }: Article) {
  const { theme } = useTheme();

  const handleOpenArticle = () => {
    Linking.openURL(url);
  };

  return (
    <BaseCard width={280} enableCardPadding={false} onPress={handleOpenArticle}>
      <Image
        containerStyle={{
          width: '100%',
          aspectRatio: 4 / 3,
        }}
        PlaceholderContent={<ActivityIndicator />}
        source={{ uri: urlToImage }}
      />
      <View
        style={{
          padding: theme.spacing.xl,
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
          <Text caption>{source}</Text>
          <Icon type="entypo" name="dot-single" color={theme.colors.grey4} />
          <Text caption>{formatTimeAgo(publishedAt)}</Text>
        </View>
      </View>
    </BaseCard>
  );
}

export default ArticleCard;
