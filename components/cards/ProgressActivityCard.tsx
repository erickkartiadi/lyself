import { LinearProgress, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

import { BORDER_RADIUS } from '../../theme/styles';
import { ProgressActivity } from '../../types/types';
import { ACTIVITY_ICON } from '../../utils/constant/constant';
import normalize from '../../utils/normalize';
import { comingSoonToast } from '../../utils/toast';
import ActivityIcon from '../base/ActivityIcon';
import Card from '../base/Card';

function ProgressActivityCard({ activity, id, progress, time, title }: ProgressActivity) {
  const { theme } = useTheme();

  const activityColor = theme.colors[ACTIVITY_ICON[activity].color] as string;

  return (
    <Card
      key={id}
      containerStyle={{ marginBottom: theme.spacing.xl }}
      onPress={comingSoonToast}
    >
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
          width={normalize(64)}
          activityType={activity}
          containerStyle={{ marginRight: theme.spacing.xl }}
        />
        <View
          style={{
            flex: 1,
          }}
        >
          <Text subtitle style={{ marginBottom: theme.spacing.sm }}>
            {title}
          </Text>
          <LinearProgress
            value={progress / 100}
            variant="determinate"
            color={activityColor}
            style={{
              borderRadius: BORDER_RADIUS.rounded,
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
            <Text caption color={activityColor}>
              {`${progress}%`}
            </Text>
            <Text caption color={theme.colors.grey3}>
              {time}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

export default ProgressActivityCard;
