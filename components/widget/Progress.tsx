import { LinearProgress, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { ProgressProps, dataProgress } from '../../constant';
import { styles } from '../../theme';
import { comingSoonToast } from '../../utils/comingSoonToast';
import ActivityIcon from '../ActivityIcon';
import BaseCard from '../BaseCard';

function ProgressCard() {
  const { theme } = useTheme();

  return (
    <>
      {dataProgress.map(
        ({ activityType, id, progress, time, title }: ProgressProps) => (
          <BaseCard key={id} onPress={comingSoonToast}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActivityIcon
                size={64}
                activity={activityType}
                containerStyle={{ marginRight: theme.spacing.xl }}
              />
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text subtitle1 style={{ marginBottom: theme.spacing.sm }}>
                  {title}
                </Text>
                <LinearProgress
                  value={progress / 100}
                  color={theme.colors.secondary}
                  variant="determinate"
                  style={{
                    borderRadius: 100,
                    height: 5,
                    marginVertical: theme.spacing.xs,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text caption style={{ color: theme.colors.secondary }}>
                    {`${progress}%`}
                  </Text>
                  <Text caption style={{ color: theme.colors.grey1 }}>
                    {time}
                  </Text>
                </View>
              </View>
            </View>
          </BaseCard>
        )
      )}
    </>
  );
}

function Progress() {
  return (
    <View style={styles.containerSection}>
      <Text h4>Continue your progress</Text>
      <ProgressCard />
    </View>
  );
}
export default Progress;
