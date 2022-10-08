import {
  Card as RNECard,
  CardProps as RNECardProps,
  ThemeSpacing,
  useTheme,
} from '@rneui/themed';
import * as React from 'react';
import { FlexStyle, StyleProp, ViewStyle } from 'react-native';

import appStyles from '../../theme/appStyles';
import { BORDER_RADIUS } from '../../theme/theme';
import AnimatedPressable, { AnimatedPressableProps } from './AnimatedPressable';

interface CardProps extends AnimatedPressableProps {
  width?: FlexStyle['width'];
  cardPadding?: keyof ThemeSpacing;
  enableCardPadding?: boolean;
  cardStyle?: RNECardProps['containerStyle'];
  containerStyle?: StyleProp<ViewStyle>;
}

function Card({
  children,
  onPress,
  containerStyle,
  enableCardPadding,
  cardStyle,
  width,
  cardPadding = 'xl',
  enablePressAnimation,
}: CardProps) {
  const { theme } = useTheme();

  return (
    <AnimatedPressable
      enablePressAnimation={enablePressAnimation}
      onPress={onPress}
      style={[containerStyle, { width }]}
    >
      <RNECard
        containerStyle={[
          appStyles.shadowLarge,
          {
            borderWidth: 0.35,
            borderRadius: BORDER_RADIUS.lg,
            borderColor: theme.colors.grey5,
            padding: enableCardPadding ? theme.spacing[cardPadding] : 0,
            backgroundColor: theme.colors.cardBackground,
            marginTop: 0,
          },
          cardStyle,
        ]}
      >
        {children}
      </RNECard>
    </AnimatedPressable>
  );
}

Card.defaultProps = {
  enableCardPadding: true,
  width: '100%',
  cardPadding: 'xl',
  cardStyle: {},
  containerStyle: {},
};

export default Card;
