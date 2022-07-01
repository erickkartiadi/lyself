import { Text, useTheme } from '@rneui/themed';
import React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import ActivityIcon, { Activities } from '../ActivityIcon';
import BaseCard from '../BaseCard';

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
    <Pressable onPress={onPress}>
      <BaseCard>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <ActivityIcon
            containerStyle={{ marginRight: theme.spacing.lg }}
            activity={activity}
          />
          <View style={{ paddingRight: theme.spacing.lg }}>
            <Text h4>{title}</Text>
            <Text>{`${time}m`}</Text>
          </View>
        </View>
      </BaseCard>
    </Pressable>
  );
}

export default RecommendedActivityCard;
