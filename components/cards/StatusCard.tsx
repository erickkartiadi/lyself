import { Icon, IconProps, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { TextStyle, View } from 'react-native';

import { Status } from '../../types/types';
import BaseCard from '../bases/BaseCard';

export interface StatusCardProps extends Status {
  textColor: TextStyle['color'];
  icon: IconProps;
}

function StatusCard({ title, caption, value, textColor, icon }: StatusCardProps) {
  const { ...restIconProps } = icon;
  const { theme } = useTheme();

  return (
    <BaseCard key={title} width="48%">
      <Text subtitle>{title}</Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View>
          <Text h2 h2Style={{ color: textColor, marginBottom: 0 }}>
            {value}
          </Text>
          <Text caption>{caption}</Text>
        </View>
        {icon.type !== '' && (
          <View>
            <Icon
              containerStyle={{
                marginRight: theme.spacing.sm,
              }}
              {...restIconProps}
            />
          </View>
        )}
      </View>
    </BaseCard>
  );
}
export default StatusCard;
