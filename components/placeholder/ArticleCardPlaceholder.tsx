import { Skeleton, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

import { BORDER_RADIUS } from '../../theme/styles';

function ArticleCardPlaceholder() {
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

export default ArticleCardPlaceholder;
