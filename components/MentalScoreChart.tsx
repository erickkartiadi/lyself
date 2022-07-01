import { Text } from '@rneui/themed';
import {
  themeSpacing,
  useTheme,
  useThemeMode,
} from '@rneui/themed/dist/config/ThemeProvider';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import styles from '../theme/styles';
import BaseCard from './BaseCard';

function Emoji({ fill }: { fill: number }) {
  let currentEmoji = '😁';

  if (fill >= 0) currentEmoji = '😢';
  if (fill >= 25) currentEmoji = '☹️';
  if (fill >= 50) currentEmoji = '😐';
  if (fill >= 60) currentEmoji = '🙂';
  if (fill >= 80) currentEmoji = '😄';
  if (fill >= 90) currentEmoji = '🥰';

  return <Text h3>{currentEmoji}</Text>;
}

function MentalScoreChart() {
  const { theme } = useTheme();
  const { mode } = useThemeMode();

  return (
    <BaseCard
      containerStyle={{
        overflow: 'hidden',
        padding: 0,
        marginBottom: themeSpacing.md,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          padding: themeSpacing.xl * 1.25,
          marginBottom: themeSpacing.xl * 1.25,
        }}
      >
        <AnimatedCircularProgress
          size={64}
          width={6}
          fill={Math.floor(Math.random() * 100) + 1}
          tintColor={theme.colors.warning}
          tintColorSecondary={theme.colors.primary}
          backgroundColor={theme.colors.grey4}
          prefill={0}
          style={{ marginRight: themeSpacing.xl }}
        >
          {(fill) => <Emoji fill={fill} />}
        </AnimatedCircularProgress>

        <View
          style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}
        >
          <Text h3 style={{ color: theme.colors.primary }}>
            Awesome
          </Text>
          <Text>Keep up the mood</Text>
        </View>
      </View>
      <LineChart
        data={{
          labels: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
          datasets: [
            {
              data: [
                Math.floor(Math.random() * 10) + 1,
                Math.floor(Math.random() * 10) + 1,
                Math.floor(Math.random() * 10) + 1,
                Math.floor(Math.random() * 10) + 1,
                Math.floor(Math.random() * 10) + 1,
                Math.floor(Math.random() * 10) + 1,
                Math.floor(Math.random() * 10) + 1,
              ],
            },
          ],
        }}
        width={
          Dimensions.get('screen').width +
          30 +
          styles.containerSection.paddingHorizontal * 2
        }
        height={300}
        withInnerLines={false}
        withOuterLines={false}
        withHorizontalLabels={false}
        xLabelsOffset={-42}
        chartConfig={{
          backgroundColor: theme.colors.cardBackground,
          backgroundGradientFrom: theme.colors.cardBackground,
          backgroundGradientTo: theme.colors.cardBackground,
          decimalPlaces: 0,
          color: () => theme.colors.primary,
          labelColor: () => theme.colors.grey1,
          fillShadowGradientOpacity: mode === 'light' ? 0.1 : 0.25,
          propsForLabels: {
            fontWeight: '700',
            fontFamily: 'Inter-Medium',
          },
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: theme.colors.white,
          },
        }}
        bezier
        style={{
          paddingRight: -32,
          paddingBottom: -58,
        }}
      />
    </BaseCard>
  );
}

export default MentalScoreChart;
