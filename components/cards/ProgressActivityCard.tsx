import { LinearProgress, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

import { ACTIVITY_ICON } from '../../constant/constant';
import { BORDER_RADIUS } from '../../theme/styles';
import { ProgressActivity } from '../../types/types';
import { comingSoonToast } from '../../utils/comingSoonToast';
import ActivityIcon from '../ActivityIcon';
import BaseCard from '../bases/BaseCard';

// TODO linear gradient progress color
function ProgressActivityCard({
  activity,
  id,
  progress,
  time,
  title,
}: ProgressActivity) {
  const { theme } = useTheme();

  const activityColor = theme.colors[ACTIVITY_ICON[activity].color] as string;

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
          width={64}
          activityType={activity}
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
            variant="determinate"
            color={activityColor}
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
            <Text caption style={{ color: activityColor }}>
              {`${progress}%`}
            </Text>
            <Text caption style={{ color: theme.colors.grey3 }}>
              {time}
            </Text>
          </View>
        </View>
      </View>
    </BaseCard>
  );
}

export default ProgressActivityCard;
