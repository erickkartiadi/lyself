import { Skeleton, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

import BaseCard from '../bases/BaseCard';

function ArticleCardPlaceholder() {
  const { theme } = useTheme();

  return (
    <BaseCard width={280} enablePressAnimation={false} enableCardPadding={false}>
      <Skeleton height={210} />
      <View style={{ padding: theme.spacing.xl }}>
        <Skeleton height={48} />
        <Skeleton style={{ marginTop: theme.spacing.md }} height={16} width={120} />
      </View>
    </BaseCard>
  );
}

export default ArticleCardPlaceholder;
