import { LinearProgress, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

import { BORDER_RADIUS } from '../../theme/styles';
import { comingSoonToast } from '../../utils/comingSoonToast';
import ActivityIcon, { Activities } from '../ActivityIcon';
import BaseCard from '../bases/BaseCard';

export interface ProgressCardProps {
  id: string;
  title: string;
  activityType: Activities;
  progress: number;
  time: string;
}

function ProgressCard({
  activityType,
  id,
  progress,
  time,
  title,
}: ProgressCardProps) {
  const { theme } = useTheme();

  return (
    <BaseCard key={id} onPress={comingSoonToast}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIcon
          size={64}
          activity={activityType}
          containerStyle={{ marginRight: theme.spacing.xl }}
        />
        <View
          style={{
            flex: 1,
          }}
        >
          <Text subtitle1 style={{ marginBottom: theme.spacing.sm }}>
            {title}
          </Text>
          <LinearProgress
            value={progress / 100}
            color={theme.colors.secondary}
            variant="determinate"
            style={{
              borderRadius: BORDER_RADIUS.rounded,
              height: 5,
              marginVertical: theme.spacing.xs,
            }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text caption style={{ color: theme.colors.secondary }}>
              {`${progress}%`}
            </Text>
            <Text caption style={{ color: theme.colors.grey1 }}>
              {time}
            </Text>
          </View>
        </View>
      </View>
    </BaseCard>
  );
}

export default ProgressCard;
