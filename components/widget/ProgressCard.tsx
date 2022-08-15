import { LinearProgress, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { ProgressProps, dataProgress } from '../../constant';
import ActivityIcon from '../ActivityIcon';
import BaseCard from '../BaseCard';

function ProgressCard() {
  const { theme } = useTheme();

  return (
    <BaseCard>
      {dataProgress.map(
        ({ activityType, id, progress, time, title }: ProgressProps) => (
          <View
            key={id}
            style={{
              paddingVertical: theme.spacing.md,
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <ActivityIcon
              size={58}
              activity={activityType}
              containerStyle={{ marginRight: theme.spacing.xl }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ marginBottom: theme.spacing.sm }}>{title}</Text>
              <LinearProgress
                value={progress / 100}
                color={theme.colors.secondary}
                variant="determinate"
                style={{ borderRadius: 100, height: 5 }}
              />
              <View
                style={{
                  marginTop: theme.spacing.xs,
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text sm style={{ color: theme.colors.secondary }}>
                  {`${progress}%`}
                </Text>
                <Text sm style={{ color: theme.colors.grey1 }}>
                  {time}
                </Text>
              </View>
            </View>
          </View>
        )
      )}
    </BaseCard>
  );
}
export default ProgressCard;
