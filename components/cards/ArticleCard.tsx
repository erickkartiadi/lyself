import { Icon, Image, Skeleton, Text, useTheme } from '@rneui/themed';
import * as Linking from 'expo-linking';
import React from 'react';
import { View } from 'react-native';

import appStyles from '../../theme/appStyles';
import spacing from '../../theme/spacing';
import { BORDER_RADIUS } from '../../theme/theme';
import { Article } from '../../types/types';
import { formatTimeAgo } from '../../utils/formatTime';
import normalize from '../../utils/normalize';
import AnimatedPressable from '../base/AnimatedPressable';

function ArticleCard({ title, source, publishedAt, url, urlToImage }: Article) {
  const { theme } = useTheme();

  const handleOpenArticle = () => {
    Linking.openURL(url);
  };

  return (
    <AnimatedPressable
      style={[spacing.mt_md, { width: normalize(320) }]}
      onPress={handleOpenArticle}
    >
      <Image
        containerStyle={[
          appStyles.w100,
          {
            aspectRatio: 4 / 3,
          },
        ]}
        borderRadius={BORDER_RADIUS.xl}
        source={{ uri: urlToImage }}
      />
      <View style={spacing.mt_xl}>
        <Text subtitle numberOfLines={3}>
          {title}
        </Text>
        <View
          style={[
            appStyles.flex,
            appStyles.flexDirRow,
            appStyles.alignCenter,
            spacing.mt_sm,
          ]}
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
  return (
    <View style={spacing.mt_md}>
      <Skeleton
        width={normalize(320)}
        height={240}
        style={{ borderRadius: BORDER_RADIUS.xl }}
      />

      <Skeleton circle height={16} style={spacing.mt_xl} />
      <Skeleton circle height={16} style={spacing.mt_md} />
      <Skeleton circle style={spacing.mt_md} height={16} width={200} />
    </View>
  );
}
