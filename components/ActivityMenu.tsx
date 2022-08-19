import React from 'react';
import { PressableProps, View } from 'react-native';
import { Text, useTheme } from '@rneui/themed';
import ActivityIcon, { Activities } from './ActivityIcon';
import AnimatedPressable from './AnimatedPressable';

interface ActivityMenuProps {
  activity: Activities;
  onPress: PressableProps['onPress'];
}

function ActivityMenu({ activity, onPress }: ActivityMenuProps) {
  const { theme } = useTheme();

  return (
    <View
      key={activity}
      style={{
        width: '25%',
      }}
    >
      <AnimatedPressable
        style={{
          alignItems: 'center',
          marginBottom: theme.spacing.xl * 1.25,
        }}
        onPress={onPress}
      >
        <ActivityIcon activity={activity} />
        <Text
          subtitle2
          style={{
            marginTop: theme.spacing.md,
            textAlign: 'center',
            textTransform: 'capitalize',
          }}
        >
          {activity}
        </Text>
      </AnimatedPressable>
    </View>
  );
}

export default ActivityMenu;
