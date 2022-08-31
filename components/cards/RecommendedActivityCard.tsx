import { Text, useTheme } from '@rneui/themed';
import React from 'react';
import { GestureResponderEvent, View } from 'react-native';

import ActivityIcon, { Activities } from '../ActivityIcon';
import BaseCard from '../bases/BaseCard';

interface RecommendedActivityProps {
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
  activity: Activities;
  title: string;
  time: number;
}

function RecommendedActivityCard({
  onPress,
  activity,
  title,
  time,
}: RecommendedActivityProps) {
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
          size={58}
          containerStyle={{ marginRight: theme.spacing.lg }}
          activity={activity}
        />
        <View style={{ paddingRight: theme.spacing.xl }}>
          <Text>{title}</Text>
          <Text subtitle1>{`${time}m`}</Text>
        </View>
      </View>
    </BaseCard>
  );
}

export default RecommendedActivityCard;
