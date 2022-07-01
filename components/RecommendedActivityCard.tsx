import { Text } from '@rneui/themed';
import {
  themeSpacing,
  useTheme,
} from '@rneui/themed/dist/config/ThemeProvider';
import React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import BaseCard from './BaseCard';
import BaseIcon from './BaseIcon';

export type Activities = 'music' | 'breathing' | 'meditation' | 'article';

export function ActivityIcon({ activity }: { activity: Activities }) {
  const { theme } = useTheme();

  const activityType = {
    meditation: {
      type: 'material-community',
      name: 'meditation',
      backgroundColor: theme.colors.yellow,
      iconSize: 42,
    },
    music: {
      type: 'material-community',
      name: 'music-note',
      backgroundColor: theme.colors.purple,
      iconSize: 36,
    },
    breathing: {
      type: 'entypo',
      name: 'air',
      backgroundColor: theme.colors.secondary,
      iconSize: 30,
    },
    article: {
      type: 'ionicon',
      name: 'newspaper',
      backgroundColor: theme.colors.primary,
      iconSize: 30,
    },
  };

  const { type, name, backgroundColor, iconSize } = activityType[activity];

  return (
    <BaseIcon
      backgroundColor={backgroundColor}
      size={54}
      iconSize={iconSize}
      color={theme.colors.white}
      iconType={type}
      iconName={name}
    />
  );
}

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
          <ActivityIcon activity={activity} />
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
