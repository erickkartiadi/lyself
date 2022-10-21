import {
  Card as RNECard,
  CardProps as RNECardProps,
  ThemeSpacing,
  useTheme,
} from '@rneui/themed';
import * as React from 'react';
import { FlexStyle, StyleProp, ViewStyle } from 'react-native';

import border from '../../styles/border';
import shadow from '../../styles/shadow';
import spacing from '../../styles/spacing';
import useStyles from '../../utils/hooks/useStyles';
import AnimatedPressable, { AnimatedPressableProps } from './AnimatedPressable';

export interface CardProps extends AnimatedPressableProps {
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
  const styles = useStyles();

  return (
    <AnimatedPressable
      enablePressAnimation={enablePressAnimation}
      onPress={onPress}
      style={[containerStyle, { width }]}
    >
      <RNECard
        containerStyle={[
          shadow.lg,
          border.width_sm,
          styles.borderGrey5,
          spacing.mt_0,
          border.radius_lg,
          styles.cardBackground,
          {
            padding: enableCardPadding ? theme.spacing[cardPadding] : 0,
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
