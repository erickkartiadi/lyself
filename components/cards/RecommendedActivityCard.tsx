import { Text, useTheme } from '@rneui/themed';
import * as React from 'react';
import { View } from 'react-native';

import { Activity } from '../../types/types';
import ActivityIcon from '../ActivityIcon';
import { AnimatedPressableProps } from '../AnimatedPressable';
import BaseCard from '../bases/BaseCard';

export interface RecommendedActivityCardProps extends Activity, AnimatedPressableProps {}

function RecommendedActivityCard({
  onPress,
  activity,
  title,
  time,
}: RecommendedActivityCardProps) {
  const { theme } = useTheme();

  return (
    <BaseCard containerStyle={{ flex: 1 }} onPress={onPress}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <ActivityIcon
          width={58}
          containerStyle={{ marginRight: theme.spacing.lg }}
          activityType={activity}
        />
        <View style={{ paddingRight: theme.spacing.xl }}>
          <Text subtitle>{title}</Text>
          <Text color={theme.colors.grey3}>{time}</Text>
        </View>
      </View>
    </BaseCard>
  );
}

export default RecommendedActivityCard;
