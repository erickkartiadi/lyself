import * as React from 'react';
import { Card, CardProps, useTheme } from '@rneui/themed';
import { PressableProps } from 'react-native';
import { ThemeModeContext } from '../../theme/ThemeModeContext';
import AnimatedPressable, { AnimatedPressableProps } from './AnimatedPressable';
import { BORDER_RADIUS } from '../../theme/styles';

interface BaseCardProps {
  enablePadding?: boolean;
  width?: string | number;
  cardStyle?: CardProps['containerStyle'];
  cardPadding?: 'lg' | 'xl';
  enablePressAnimation?: AnimatedPressableProps['enablePressAnimation'];
}

function BaseCard({
  children,
  onPress,
  containerStyle,
  enablePadding,
  cardStyle,
  width,
  cardPadding = 'xl',
  enablePressAnimation,
}: React.PropsWithChildren<CardProps & BaseCardProps> & PressableProps) {
  const { theme } = useTheme();
  const { isDarkMode } = React.useContext(ThemeModeContext);

  return (
    <AnimatedPressable
      enablePressAnimation={enablePressAnimation}
      onPress={onPress}
      style={[containerStyle, { width }]}
    >
      <Card
        containerStyle={[
          {
            shadowColor: isDarkMode
              ? 'rgba(0, 0, 0, 1)'
              : 'rgba(0, 0, 0, 0.25)',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 12,
            borderWidth: 0,
            padding: enablePadding ? theme.spacing[cardPadding] : 0,
            borderRadius: BORDER_RADIUS.lg,
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
  enablePadding: true,
  width: '100%',
  cardPadding: 'xl',
  cardStyle: {},
  enablePressAnimation: true,
};
export default BaseCard;
