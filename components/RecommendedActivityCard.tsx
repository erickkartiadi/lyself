import { Card, Icon, Text } from '@rneui/themed';
import {
  themeSpacing,
  useTheme,
} from '@rneui/themed/dist/config/ThemeProvider';
import React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';

// import ActivityIcon from './ActivityIcon';

export type Activities = 'music' | 'breathing' | 'meditation';

export function ActivityIcon({ activity }: { activity: Activities }) {
  const { theme } = useTheme();

  const activityType = {
    meditation: {
      type: 'material-community',
      name: 'meditation',
      bgColor: theme.colors.yellow,
      iconSize: 48,
    },
    music: {
      type: 'material-community',
      name: 'music-note',
      bgColor: theme.colors.purple,
      iconSize: 40,
    },
    breathing: {
      type: 'entypo',
      name: 'air',
      bgColor: theme.colors.secondary,
      iconSize: 32,
    },
  };

  return (
    <Icon
      containerStyle={{
        backgroundColor: activityType[activity].bgColor || theme.colors.grey5,
        borderRadius: 100,
        marginRight: themeSpacing.xl,
        width: 60,
        aspectRatio: 1,
        justifyContent: 'center',
        alignContent: 'center',
      }}
      size={activityType[activity].iconSize}
      color={theme.colors.white}
      type={activityType[activity].type}
      name={activityType[activity].name}
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
      <Card>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <ActivityIcon activity={activity} />
          <View style={{ paddingRight: themeSpacing.xl }}>
            <Text>{title}</Text>
            <Text h4 bold>{`${time}m`}</Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

export default RecommendedActivityCard;