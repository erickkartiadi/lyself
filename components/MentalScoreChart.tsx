import { Card, Text } from '@rneui/themed';
import {
  themeSpacing,
  useTheme,
  useThemeMode,
} from '@rneui/themed/dist/config/ThemeProvider';
import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import styles from '../theme/styles';

function MentalScoreChart() {
  const { theme } = useTheme();
  const { mode } = useThemeMode();

  return (
    <Card containerStyle={{ overflow: 'hidden' }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          padding: themeSpacing.xl,
          paddingBottom: 32,
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.grey5,
            borderRadius: 100,
            marginRight: themeSpacing.xl,
            width: 58,
            aspectRatio: 1,
            justifyContent: 'center',
          }}
        >
          <Text style={{ textAlign: 'center' }} h2>
            😀
          </Text>
        </View>
        <View>
          <Text h1 style={{ color: theme.colors.success }}>
            80
          </Text>
          <Text>Mental score</Text>
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
                Math.random() * 100 + 30,
                Math.random() * 100 + 30,
                Math.random() * 100 + 30,
                Math.random() * 100 + 30,
                Math.random() * 100 + 30,
                Math.random() * 100 + 30,
                Math.random() * 100 + 30,
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
          backgroundColor: theme.colors.white,
          backgroundGradientFrom: theme.colors.white,
          backgroundGradientTo: theme.colors.white,
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
    </Card>
  );
}

export default MentalScoreChart;
