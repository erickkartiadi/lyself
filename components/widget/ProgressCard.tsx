import { Divider, LinearProgress, Text } from '@rneui/themed';
import {
  themeSpacing,
  useTheme,
} from '@rneui/themed/dist/config/ThemeProvider';
import React from 'react';
import { View } from 'react-native';
import ActivityIcon from '../ActivityIcon';
import BaseCard from '../BaseCard';

function ProgressCard() {
  const { theme } = useTheme();

  return (
    <BaseCard>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <ActivityIcon
          activity="breathing"
          containerStyle={{ marginRight: themeSpacing.xl }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: themeSpacing.md }}>
            Relax{' '}
            <Text sm bold>
              (3m)
            </Text>
          </Text>
          <LinearProgress
            value={0.5}
            color={theme.colors.secondary}
            variant="determinate"
            style={{ borderRadius: 100, height: 5 }}
          />
          <View
            style={{
              marginTop: themeSpacing.xs,
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text sm bold style={{ color: theme.colors.secondary }}>
              67%
            </Text>
            <Text sm style={{ color: theme.colors.grey1 }}>
              1m 30s
            </Text>
          </View>
        </View>
      </View>
      <Divider style={{ marginVertical: themeSpacing.xl * 1.25 }} />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <ActivityIcon
          activity="meditation"
          containerStyle={{ marginRight: themeSpacing.xl }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: themeSpacing.md }}>
            Morning meditation{' '}
            <Text sm bold>
              (10m)
            </Text>
          </Text>
          <LinearProgress
            value={0.9}
            color={theme.colors.secondary}
            variant="determinate"
            style={{ borderRadius: 100, height: 5 }}
          />
          <View
            style={{
              marginTop: themeSpacing.xs,
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text sm bold style={{ color: theme.colors.secondary }}>
              90%
            </Text>
            <Text sm style={{ color: theme.colors.grey1 }}>
              1m
            </Text>
          </View>
        </View>
      </View>
      <Divider style={{ marginVertical: themeSpacing.xl * 1.25 }} />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <ActivityIcon
          activity="music"
          containerStyle={{ marginRight: themeSpacing.xl }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: themeSpacing.md }}>
            Lofi beats{' '}
            <Text sm bold>
              (45m)
            </Text>
          </Text>
          <LinearProgress
            value={0.3}
            color={theme.colors.secondary}
            variant="determinate"
            style={{ borderRadius: 100, height: 5 }}
          />
          <View
            style={{
              marginTop: themeSpacing.xs,
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text sm bold style={{ color: theme.colors.secondary }}>
              30%
            </Text>
            <Text sm style={{ color: theme.colors.grey1 }}>
              31m 30s
            </Text>
          </View>
        </View>
      </View>
    </BaseCard>
  );
}
export default ProgressCard;
