import { useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

import { styles } from '../../theme/styles';
import MentalScoreCard from '../cards/MentalScoreCard';
import StatusCard, { StatusCardProps } from '../cards/StatusCard';
import SectionTitle from '../SectionTitle';

function GraphScore() {
  const { theme } = useTheme();

  const data: StatusCardProps[] = [
    {
      title: 'Heart rate',
      caption: 'bpm',
      value: '85',
      textColor: theme.colors.primary,
      icon: {
        type: 'font-awesome-5',
        name: 'heartbeat',
        size: 36,
        color: theme.colors.primary,
      },
    },
    {
      title: 'Blood pressure',
      caption: 'mmHg',
      value: '110/80',
      textColor: theme.colors.primary,
      icon: {
        type: 'fontisto',
        name: 'blood-drop',
        size: 36,
        color: theme.colors.primary,
      },
    },
    {
      title: 'Screen time',
      caption: 'more than last week',
      value: '3h 10m',
      textColor: theme.colors.blue,
      icon: {
        type: '',
        name: '',
        size: 36,
        color: theme.colors.blue,
      },
    },
    {
      title: 'Sleep time',
      caption: 'Yesterday',
      value: '8h 2m',
      textColor: theme.colors.purple,
      icon: {
        type: 'ionicon',
        name: 'moon',
        size: 36,
        color: theme.colors.yellow,
      },
    },
    {
      title: 'Activity',
      caption: 'Completed',
      value: '12',
      textColor: theme.colors.primary,
      icon: {
        type: 'ionicon',
        name: 'body',
        size: 36,
        color: theme.colors.primary,
      },
    },
    {
      title: 'Goals',
      caption: 'Completed',
      value: '8',
      textColor: theme.colors.success,
      icon: {
        type: 'ionicon',
        name: 'checkmark-done-circle',
        size: 36,
        color: theme.colors.success,
      },
    },
  ];
  return (
    <View style={styles.section}>
      <SectionTitle title="Your stats" />
      <MentalScoreCard />
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          {data.map(({ title, caption, value, textColor: color, icon }) => (
            <StatusCard
              key={title}
              title={title}
              caption={caption}
              value={value}
              textColor={color}
              icon={icon}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

export default GraphScore;
