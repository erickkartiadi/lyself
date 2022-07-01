import { Text } from '@rneui/themed';
import { themeSpacing } from '@rneui/themed/dist/config/ThemeProvider';
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
  return (
    <Pressable onPress={onPress}>
      <BaseCard>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <ActivityIcon
            containerStyle={{ marginRight: themeSpacing.lg }}
            activity={activity}
          />
          <View style={{ paddingRight: themeSpacing.lg }}>
            <Text>{title}</Text>
            <Text h3>{`${time}m`}</Text>
          </View>
        </View>
      </BaseCard>
    </Pressable>
  );
}

export default RecommendedActivityCard;
