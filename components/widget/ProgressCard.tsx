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
              marginVertical: theme.spacing.lg,
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <ActivityIcon
              size={62}
              activity={activityType}
              containerStyle={{ marginRight: theme.spacing.xl }}
            />
            <View style={{ flex: 1 }}>
              <Text h4 h4Style={{ marginBottom: theme.spacing.md }}>
                {title}
              </Text>
              <LinearProgress
                value={progress / 100}
                color={theme.colors.secondary}
                variant="determinate"
                style={{ borderRadius: 100, height: 5 }}
              />
              <View
                style={{
                  marginTop: theme.spacing.xs * -1,
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ color: theme.colors.secondary }}>
                  {`${progress}%`}
                </Text>
                <Text style={{ color: theme.colors.grey1 }}>{time}</Text>
              </View>
            </View>
          </View>
        )
      )}
    </BaseCard>
  );
}
export default ProgressCard;
