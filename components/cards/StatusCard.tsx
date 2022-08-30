import { Icon, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { ColorValue, View } from 'react-native';
import BaseCard from '../bases/BaseCard';

export interface StatusCardProps {
  title: string;
  caption: string;
  value: string;
  color: ColorValue;
  icon: {
    type: string;
    name: string;
    size: number;
    color: ColorValue;
  };
}

function StatusCard({ title, caption, value, color, icon }: StatusCardProps) {
  const { theme } = useTheme();

  return (
    <BaseCard key={title} width="48%">
      <Text subtitle1>{title}</Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View>
          <Text h2 h2Style={{ color, marginBottom: 0 }}>
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
              type={icon.type}
              name={icon.name}
              size={icon.size}
              color={icon.color}
            />
          </View>
        )}
      </View>
    </BaseCard>
  );
}
export default StatusCard;
