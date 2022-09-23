import { Skeleton, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

import { BORDER_RADIUS } from '../../theme/styles';

function PlaylistCardPlaceholder() {
  const { theme } = useTheme();

  return (
    <View style={{ marginTop: theme.spacing.md }}>
      <Skeleton height={160} width={160} style={{ borderRadius: BORDER_RADIUS.lg }} />
      <Skeleton style={{ marginTop: theme.spacing.lg }} height={16} />
      <Skeleton style={{ marginTop: theme.spacing.sm }} height={16} width={120} />
    </View>
  );
}

export default PlaylistCardPlaceholder;
