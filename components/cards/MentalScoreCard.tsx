import { Text, useTheme } from '@rneui/themed';
import React, { useContext } from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { BORDER_RADIUS, FONT_FAMILY, GUTTER_SIZE } from '../../theme/styles';
import { ThemeModeContext } from '../../utils/context/ThemeModeContext';
import { generateRandomNumber } from '../../utils/generateRandom';
import normalize from '../../utils/normalize';
import BaseCard from '../bases/BaseCard';

function Emoji({ fill }: { fill: number }) {
  let currentEmoji = '😁';

  if (fill >= 0) currentEmoji = '😢';
  if (fill >= 25) currentEmoji = '☹️';
  if (fill >= 50) currentEmoji = '😐';
  if (fill >= 60) currentEmoji = '🙂';
  if (fill >= 80) currentEmoji = '😄';
  if (fill >= 90) currentEmoji = '🥰';

  return <Text>{currentEmoji}</Text>;
}

function MentalScoreCard() {
  const { theme } = useTheme();
  const { isDarkMode } = useContext(ThemeModeContext);

  return (
    <BaseCard enableCardPadding={false}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          padding: theme.spacing.xl,
          marginBottom: theme.spacing.xl,
        }}
      >
        <AnimatedCircularProgress
          size={normalize(72)}
          width={theme.spacing.md}
          fill={generateRandomNumber(10, 100)}
          tintColor={theme.colors.warning}
          tintColorSecondary={theme.colors.primary}
          backgroundColor={theme.colors.grey4}
          prefill={0}
          style={{ marginRight: theme.spacing.xl }}
        >
          {(fill) => <Emoji fill={fill} />}
        </AnimatedCircularProgress>

        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
          <Text h3 color={theme.colors.primary}>
            Awesome
          </Text>
          <Text small>Keep up the mood</Text>
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
                generateRandomNumber(10, 100),
                generateRandomNumber(10, 100),
                generateRandomNumber(10, 100),
                generateRandomNumber(10, 100),
                generateRandomNumber(10, 100),
                generateRandomNumber(10, 100),
                generateRandomNumber(10, 100),
              ],
            },
          ],
        }}
        width={Dimensions.get('screen').width + GUTTER_SIZE * 5}
        height={normalize(335, 'height')}
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
          labelColor: () => theme.colors.black,
          fillShadowGradientOpacity: isDarkMode ? 0.25 : 0.1,
          propsForLabels: {
            fontFamily: FONT_FAMILY.bold,
            fontWeight: '700',
          },
          style: {
            borderRadius: BORDER_RADIUS.md,
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
