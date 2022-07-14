import { Text, useTheme } from '@rneui/themed';
import React, { useContext } from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import BaseCard from '../BaseCard';
import { styles } from '../../theme';
import { ThemeModeContext } from '../../theme/ThemeModeContext';

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

function MentalScoreCard() {
  const { theme } = useTheme();
  const { isDarkMode } = useContext(ThemeModeContext);

  return (
    <BaseCard
      containerStyle={{
        overflow: 'hidden',
        padding: 0,
        marginBottom: theme.spacing.md,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          padding: theme.spacing.xl * 1.25,
          marginBottom: theme.spacing.xl * 1.25,
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
          style={{ marginRight: theme.spacing.xl }}
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
          backgroundColor: isDarkMode
            ? theme.colors.cardBackground
            : theme.colors.background,
          backgroundGradientFrom: isDarkMode
            ? theme.colors.cardBackground
            : theme.colors.background,
          backgroundGradientTo: isDarkMode
            ? theme.colors.cardBackground
            : theme.colors.background,
          decimalPlaces: 0,
          color: () => theme.colors.primary,
          labelColor: () => theme.colors.grey1,
          fillShadowGradientOpacity: isDarkMode ? 0.25 : 0.1,
          propsForLabels: {
            fontWeight: '700',
            fontFamily: 'Inter-Medium',
          },
          style: {
            borderRadius: theme.spacing.md,
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

export default MentalScoreCard;
