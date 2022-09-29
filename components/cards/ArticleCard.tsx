import { Icon, Image, Skeleton, Text, useTheme } from '@rneui/themed';
import * as Linking from 'expo-linking';
import React from 'react';
import { View } from 'react-native';

import { BORDER_RADIUS } from '../../theme/styles';
import { Article } from '../../types/types';
import { formatTimeAgo } from '../../utils/formatTimeAgo';
import AnimatedPressable from '../base/AnimatedPressable';

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
          <Text caption color={theme.colors.grey3}>
            {source}
          </Text>
          <Icon type="entypo" name="dot-single" color={theme.colors.grey3} />
          <Text caption color={theme.colors.grey3}>
            {formatTimeAgo(publishedAt)}
          </Text>
        </View>
      </View>
    </AnimatedPressable>
  );
}

export default ArticleCard;

export function ArticleCardPlaceholder() {
  const { theme } = useTheme();

  return (
    <View style={{ marginTop: theme.spacing.md }}>
      <Skeleton width={320} height={240} style={{ borderRadius: BORDER_RADIUS.xl }} />

      <Skeleton circle height={16} style={{ marginTop: theme.spacing.xl }} />
      <Skeleton circle height={16} style={{ marginTop: theme.spacing.md }} />
      <Skeleton circle style={{ marginTop: theme.spacing.md }} height={16} width={200} />
    </View>
  );
}
