import { Icon, Image, Skeleton, Text, useTheme } from '@rneui/themed';
import * as Linking from 'expo-linking';
import React from 'react';
import { View } from 'react-native';

import border from '../../styles/border';
import layout from '../../styles/layout';
import shadow from '../../styles/shadow';
import { width } from '../../styles/size';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import { Article } from '../../types/types';
import { formatTimeAgo } from '../../utils/formatTime';
import useStyles from '../../utils/hooks/useStyles';
import AnimatedPressable from '../base/AnimatedPressable';

function ArticleCard({ title, source, publishedAt, url, urlToImage }: Article) {
  const { theme } = useTheme();

  const handleOpenArticle = () => {
    Linking.openURL(url);
  };

  const styles = useStyles();

  return (
    <AnimatedPressable
      containerStyle={[spacing.mt_md, width.w_13xl]}
      onPress={handleOpenArticle}
    >
      <Image
        containerStyle={[
          width.w_100,
          border.radius_xl,
          layout.ratio_fourThree,
          shadow.sm,
        ]}
        source={{ uri: urlToImage }}
      />
      <View style={spacing.mt_xl}>
        <Text subtitle numberOfLines={3}>
          {title}
        </Text>
        <View
          style={[layout.flex, layout.flex_dir_row, layout.align_center, spacing.mt_sm]}
        >
          <Text caption style={styles.textGrey}>
            {source}
          </Text>
          <Icon type="entypo" name="dot-single" color={theme.colors.grey3} />
          <Text caption style={styles.textGrey}>
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
        width={SIZING['13xl']}
        height={(SIZING['13xl'] / 4) * 3}
        style={border.radius_xl}
      />

      <Skeleton circle height={SIZING.xl} style={spacing.mt_xl} />
      <Skeleton circle height={SIZING.xl} style={spacing.mt_md} />
    </View>
  );
}
