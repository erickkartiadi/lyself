import { useTheme } from '@rneui/themed';
import React from 'react';

import { ActivityType } from '../types/types';
import BaseIcon, { BaseIconProps } from './bases/BaseIcon';

export type ActivityTypeIcon = ActivityType | 'other';

interface ActivityIconProps
  extends Pick<BaseIconProps, 'containerStyle' | 'width'> {
  activityType: ActivityTypeIcon;
}

function ActivityIcon({
  activityType,
  containerStyle,
  width,
}: ActivityIconProps) {
  const { theme } = useTheme();

  const activityIcon = {
    meditation: {
      type: 'material-community',
      name: 'meditation',
      backgroundColor: theme.colors.yellow,
      iconSize: 42,
    },
    consult: {
      type: 'font-awesome',
      name: 'stethoscope',
      backgroundColor: theme.colors.primary,
      iconSize: 32,
    },
    forum: {
      type: 'material-community',
      name: 'forum',
      backgroundColor: theme.colors.secondary,
      iconSize: 26,
    },
    article: {
      type: 'ionicon',
      name: 'newspaper',
      backgroundColor: theme.colors.error,
      iconSize: 30,
    },
    breathing: {
      type: 'entypo',
      name: 'air',
      backgroundColor: theme.colors.blue,
      iconSize: 30,
    },
    diagnose: {
      type: 'font-awesome-5',
      name: 'diagnoses',
      backgroundColor: theme.colors.yellow,
      iconSize: 26,
    },
    music: {
      type: 'material-community',
      name: 'music-note',
      backgroundColor: theme.colors.purple,
      iconSize: 36,
    },
    todo: {
      type: 'ionicon',
      name: 'checkmark-done-sharp',
      backgroundColor: theme.colors.secondary,
      iconSize: 32,
    },
    other: {
      type: 'material-icon',
      name: 'more-horiz',
      backgroundColor: theme.colors.grey3,
      iconSize: 42,
    },
  };

  const { type, name, backgroundColor, iconSize } = activityIcon[activityType];

  return (
    <BaseIcon
      backgroundColor={backgroundColor}
      containerStyle={containerStyle}
      width={width}
      size={iconSize}
      type={type}
      name={name}
      color={theme.colors.white}
    />
  );
}

export default ActivityIcon;
