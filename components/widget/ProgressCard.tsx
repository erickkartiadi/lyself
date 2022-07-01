import { Divider, LinearProgress, Text, useTheme } from '@rneui/themed';

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
          paddingTop: theme.spacing.sm,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <ActivityIcon
          size={58}
          activity="breathing"
          containerStyle={{ marginRight: theme.spacing.xl }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: theme.spacing.sm }}>Relax</Text>
          <LinearProgress
            value={0.5}
            color={theme.colors.secondary}
            variant="determinate"
            style={{ borderRadius: 100, height: 5 }}
          />
          <View
            style={{
              marginTop: theme.spacing.xs,
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
      <Divider style={{ marginVertical: theme.spacing.xl * 1.5 }} />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <ActivityIcon
          size={58}
          activity="meditation"
          containerStyle={{ marginRight: theme.spacing.xl }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: theme.spacing.sm }}>
            Morning meditation
          </Text>
          <LinearProgress
            value={0.9}
            color={theme.colors.secondary}
            variant="determinate"
            style={{ borderRadius: 100, height: 5 }}
          />
          <View
            style={{
              marginTop: theme.spacing.xs,
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
      <Divider style={{ marginVertical: theme.spacing.xl * 1.25 }} />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <ActivityIcon
          size={58}
          activity="music"
          containerStyle={{ marginRight: theme.spacing.xl }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: theme.spacing.sm }}>Lofi Beats</Text>
          <LinearProgress
            value={0.3}
            color={theme.colors.secondary}
            variant="determinate"
            style={{ borderRadius: 100, height: 5 }}
          />
          <View
            style={{
              marginTop: theme.spacing.xs,
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
