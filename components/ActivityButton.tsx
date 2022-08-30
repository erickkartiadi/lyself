import React from 'react';
import { PressableProps, View } from 'react-native';
import { Text, useTheme } from '@rneui/themed';
import AnimatedPressable from './AnimatedPressable';
import ActivityIcon, { Activities } from './ActivityIcon';

interface ActivityButtonProps {
  activity: Activities;
  onPress: PressableProps['onPress'];
}

function ActivityButton({ activity, onPress }: ActivityButtonProps) {
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
          marginVertical: theme.spacing.xl,
        }}
        onPress={onPress}
      >
        <ActivityIcon
          containerStyle={{ alignSelf: 'center' }}
          activity={activity}
        />
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

export default ActivityButton;
