import * as React from 'react';
import { Card, CardProps, useTheme } from '@rneui/themed';
import { PressableProps } from 'react-native';
import { ThemeModeContext } from '../../theme/ThemeModeContext';
import AnimatedPressable from './AnimatedPressable';
import { BORDER_RADIUS } from '../../theme/styles';

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
  const { isDarkMode } = React.useContext(ThemeModeContext);

  return (
    <AnimatedPressable onPress={onPress} style={[containerStyle, { width }]}>
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
            padding: disablePadding ? 0 : theme.spacing.xl,
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
  disablePadding: false,
  width: '100%',
  cardStyle: {},
};
export default BaseCard;