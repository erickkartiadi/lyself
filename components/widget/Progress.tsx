import { LinearProgress, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { styles } from '../../theme';
import { comingSoonToast } from '../../utils/comingSoonToast';
import ActivityIcon, { Activities } from '../ActivityIcon';
import BaseCard from '../BaseCard';
import SectionTitle from '../SectionTitle';

interface ProgressCardProps {
  id: string;
  title: string;
  activityType: Activities;
  progress: number;
  time: string;
}

export const dataProgress: ProgressCardProps[] = [
  {
    id: '1',
    title: 'Relax',
    activityType: 'breathing',
    progress: 67,
    time: '1m 30s',
  },
  {
    id: '2',
    title: 'Morning meditation',
    activityType: 'meditation',
    progress: 90,
    time: '1m',
  },
  {
    id: '3',
    title: 'Chill vibes',
    activityType: 'music',
    progress: 40,
    time: '15m',
  },
];

function ProgressCard({
  activityType,
  id,
  progress,
  time,
  title,
}: ProgressCardProps) {
  const { theme } = useTheme();

  return (
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
  );
}

function Progress() {
  return (
    <View style={styles.containerSection}>
      <SectionTitle title="Continue your progress" />

      {dataProgress.map(({ activityType, id, progress, time, title }) => (
        <ProgressCard
          activityType={activityType}
          key={id}
          id={id}
          progress={progress}
          time={time}
          title={title}
        />
      ))}
    </View>
  );
}
export default Progress;
