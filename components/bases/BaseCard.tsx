import {
  Card,
  CardProps,
  lightColors,
  ThemeSpacing,
  useTheme,
} from '@rneui/themed';
import colorAlpha from 'color-alpha';
import * as React from 'react';
import { FlexStyle, StyleProp, ViewStyle } from 'react-native';

import { BORDER_RADIUS } from '../../theme/styles';
import AnimatedPressable, {
  AnimatedPressableProps,
} from '../AnimatedPressable';

interface BaseCardProps extends AnimatedPressableProps {
  width?: FlexStyle['width'];
  cardPadding?: keyof ThemeSpacing;
  enableCardPadding?: boolean;
  cardStyle?: CardProps['containerStyle'];
  containerStyle?: StyleProp<ViewStyle>;
}

function BaseCard({
  children,
  onPress,
  containerStyle,
  enableCardPadding,
  cardStyle,
  width,
  cardPadding = 'xl',
  enablePressAnimation,
}: BaseCardProps) {
  const { theme } = useTheme();

  return (
    <AnimatedPressable
      enablePressAnimation={enablePressAnimation}
      onPress={onPress}
      style={[containerStyle, { width }]}
    >
      <Card
        containerStyle={[
          {
            shadowColor: colorAlpha(lightColors.black, 0.25),
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.37,
            shadowRadius: 7.49,

            elevation: 12,
            borderWidth: 0,
            padding: enableCardPadding ? theme.spacing[cardPadding] : 0,
            borderRadius: BORDER_RADIUS.xl,
            overflow: 'hidden',
            backgroundColor: theme.colors.cardBackground,
            marginTop: theme.spacing.md,
            marginBottom: theme.spacing.md,
          },
          cardStyle,
        ]}
      >
        {children}
      </Card>
    </AnimatedPressable>
  );
}

BaseCard.defaultProps = {
  enableCardPadding: true,
  width: '100%',
  cardPadding: 'xl',
  cardStyle: {},
  containerStyle: {},
};

export default BaseCard;
