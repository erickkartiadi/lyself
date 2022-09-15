import { Icon, Image, Text, useTheme } from '@rneui/themed';
import * as Linking from 'expo-linking';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Article } from '../../types/types';
import BaseCard from '../bases/BaseCard';

TimeAgo.addDefaultLocale(en);

function ArticleCard({ title, source, publishedAt, url, urlToImage }: Article) {
  const { theme } = useTheme();

  const handleOpenArticle = () => {
    Linking.openURL(url);
  };

  const timeAgo = new TimeAgo('en-US');
  const formattedTimeAgo = timeAgo.format(Date.parse(publishedAt));

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
          <Text caption>{formattedTimeAgo}</Text>
        </View>
      </View>
    </BaseCard>
  );
}

export default ArticleCard;
