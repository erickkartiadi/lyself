import { Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

import ActivityIcon, { ActivityTypeIcon } from './ActivityIcon';
import AnimatedPressable, { AnimatedPressableProps } from './AnimatedPressable';

interface ActivityButtonProps extends Pick<AnimatedPressableProps, 'onPress'> {
  activityType: ActivityTypeIcon;
}

function ActivityButton({ activityType, onPress }: ActivityButtonProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        width: '25%',
      }}
    >
      <AnimatedPressable
        style={{
          marginVertical: theme.spacing.xl,
        }}
        onPress={onPress}
      >
        <ActivityIcon
          width={54}
          containerStyle={{ alignSelf: 'center' }}
          activityType={activityType}
        />
        <Text
          subtitle2
          style={{
            marginTop: theme.spacing.md,
            textAlign: 'center',
            textTransform: 'capitalize',
          }}
        >
          {activityType}
        </Text>
      </AnimatedPressable>
    </View>
  );
}

export default ActivityButton;
