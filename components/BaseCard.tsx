import * as React from 'react';
import { Card, CardProps, useTheme } from '@rneui/themed';
import { PressableProps } from 'react-native';
import AnimatedPressable from './AnimatedPressable';

interface BaseCardProps {
  disablePadding?: boolean;
  width?: string | number;
  cardStyle?: CardProps['containerStyle'];
}

function BaseCard({
  children,
  onPress,
  containerStyle,
  disablePadding,
  cardStyle,
  width,
}: React.PropsWithChildren<CardProps> & PressableProps & BaseCardProps) {
  const { theme } = useTheme();

  return (
    <AnimatedPressable onPress={onPress} style={[containerStyle, { width }]}>
      <Card
        containerStyle={[
          {
            // ios shadow
            shadowColor: 'rgba(0, 0, 0, 0.08)',
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.22,
            shadowRadius: 9.22,
            // android shadow
            elevation: 12,

            borderWidth: 0,
            padding: disablePadding ? 0 : theme.spacing.lg,
            borderRadius: theme.spacing.md,
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
  disablePadding: false,
  width: '100%',
  cardStyle: {},
};
export default BaseCard;
