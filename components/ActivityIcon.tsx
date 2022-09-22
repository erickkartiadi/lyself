import { useTheme } from '@rneui/themed';
import React from 'react';

import { ActivityType } from '../types/types';
import { ACTIVITY_ICON } from '../utils/constant/constant';
import BaseIcon, { BaseIconProps } from './bases/BaseIcon';

export type ActivityTypeIcon = ActivityType | 'other';

interface ActivityIconProps extends Pick<BaseIconProps, 'containerStyle' | 'width'> {
  activityType: ActivityTypeIcon;
}

function ActivityIcon({ activityType, containerStyle, width }: ActivityIconProps) {
  const { theme } = useTheme();

  const { type, name, color, iconSize } = ACTIVITY_ICON[activityType];
  const activityColor = theme.colors[color] as string;

  return (
    <BaseIcon
      backgroundColor={activityColor}
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
