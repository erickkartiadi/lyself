import { Icon } from '@rneui/base';
import {
  themeSpacing,
  useTheme,
} from '@rneui/themed/dist/config/ThemeProvider';
import React from 'react';
import { ColorValue, View } from 'react-native';
import { Text } from '@rneui/themed';
import BaseCard from '../BaseCard';

interface StatusCardData {
  title: string;
  subtitle: string;
  value: string;
  color: ColorValue;
  icon: {
    type: string;
    name: string;
    size: number;
    color: ColorValue;
  };
}

function StatusCard() {
  const { theme } = useTheme();

  const data: StatusCardData[] = [
    {
      title: 'Heart rate',
      subtitle: 'bpm',
      value: '100',
      color: theme.colors.primary,
      icon: {
        type: 'font-awesome-5',
        name: 'heartbeat',
        size: 42,
        color: theme.colors.primary,
      },
    },
    {
      title: 'Blood pressure',
      subtitle: 'mmHg',
      value: '110/80',
      color: theme.colors.primaryDark,
      icon: {
        type: 'fontisto',
        name: 'blood-drop',
        size: 42,
        color: theme.colors.primaryDark,
      },
    },
    {
      title: 'Screen activity',
      subtitle: '1h less than yesterday',
      value: '3h 10m',
      color: theme.colors.secondary,
      icon: {
        type: '',
        name: '',
        size: 42,
        color: theme.colors.secondary,
      },
    },
    {
      title: 'Sleep time',
      subtitle: 'Yesterday',
      value: '8h 2m',
      color: theme.colors.purple,
      icon: {
        type: 'ionicon',
        name: 'moon',
        size: 42,
        color: theme.colors.yellow,
      },
    },
    {
      title: 'Activity',
      subtitle: 'Completed',
      value: '12',
      color: theme.colors.primary,
      icon: {
        type: 'ionicon',
        name: 'body',
        size: 42,
        color: theme.colors.primary,
      },
    },
    {
      title: 'Goals',
      subtitle: 'Completed',
      value: '8',
      color: theme.colors.success,
      icon: {
        type: 'ionicon',
        name: 'checkmark-done-circle',
        size: 42,
        color: theme.colors.success,
      },
    },
  ];

  return (
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
        {data.map(({ title, subtitle, value, color, icon }) => (
          <BaseCard
            key={title}
            containerStyle={{
              width: '48%',
            }}
          >
            <Text style={{ marginBottom: themeSpacing.sm }} bold>
              {title}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View>
                <Text h2 h2Style={{ color }}>
                  {value}
                </Text>
                <Text sm style={{ color: theme.colors.grey1 }}>
                  {subtitle}
                </Text>
              </View>
              <View>
                <Icon
                  containerStyle={{
                    marginRight: themeSpacing.sm,
                  }}
                  type={icon.type}
                  name={icon.name}
                  size={icon.size}
                  color={icon.color}
                />
              </View>
            </View>
          </BaseCard>
        ))}
      </View>
    </View>
  );
}
export default StatusCard;
