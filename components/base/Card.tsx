import { Card as RNECard, CardProps as RNECardProps } from '@rneui/themed';
import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import border from '../../styles/border';
import shadow from '../../styles/shadow';
import spacing from '../../styles/spacing';
import useStyles from '../../utils/hooks/useStyles';

export interface CardProps extends React.PropsWithChildren<RNECardProps> {
  containerStyle?: StyleProp<ViewStyle>;
}

function Card({ containerStyle, children }: CardProps) {
  const styles = useStyles();

  return (
    <RNECard
      containerStyle={[
        shadow.lg,
        border.width_sm,
        styles.borderGrey5,
        spacing.mt_0,
        border.radius_lg,
        styles.cardBackground,
        containerStyle,
      ]}
    >
      {children}
    </RNECard>
  );
}

Card.defaultProps = {
  containerStyle: {},
};

export default Card;
