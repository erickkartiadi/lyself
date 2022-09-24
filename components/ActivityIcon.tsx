import { Icon, IconProps, useTheme } from '@rneui/themed';
import React from 'react';
import { FlexStyle } from 'react-native';

import { BORDER_RADIUS } from '../theme/styles';
import { ActivityType } from '../types/types';
import { ACTIVITY_ICON } from '../utils/constant/constant';

export type ActivityTypeIcon = ActivityType | 'other';

interface ActivityIconProps {
  activityType: ActivityTypeIcon;
  width: FlexStyle['width'];
  containerStyle: IconProps['containerStyle'];
}

function ActivityIcon({ activityType, containerStyle, width }: ActivityIconProps) {
  const { theme } = useTheme();

  const { type, name, color, iconSize } = ACTIVITY_ICON[activityType];
  const activityColor = theme.colors[color] as string;

  return (
    <Icon
      size={iconSize}
      name={name}
      type={type}
      color={theme.colors.white}
      containerStyle={[
        {
          backgroundColor: activityColor,
          width,
          borderRadius: BORDER_RADIUS.rounded,
          justifyContent: 'center',
          alignItems: 'center',
        },
        containerStyle,
      ]}
    />
  );
}

export default ActivityIcon;
