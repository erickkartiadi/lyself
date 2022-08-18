import * as React from 'react';
import { Card, CardProps, useTheme } from '@rneui/themed';
import { PressableProps } from 'react-native';
import { ThemeModeContext } from '../theme/ThemeModeContext';
import AnimatedPressable from './AnimatedPressable';

interface BaseCardProps {
  disablePadding?: boolean;
  width?: string | number;
}

function BaseCard({
  children,
  onPress,
  containerStyle,
  disablePadding,
  width,
}: React.PropsWithChildren<CardProps> & PressableProps & BaseCardProps) {
  const { theme } = useTheme();
  const { isDarkMode } = React.useContext(ThemeModeContext);

  return (
    <AnimatedPressable onPress={onPress} style={[containerStyle, { width }]}>
      <Card
        containerStyle={[
          {
            backgroundColor: theme.colors.cardBackground,
            margin: 0,
            shadowColor: 'rgba(0,0,0,0.08)',
            shadowRadius: 1,
            elevation: 1,
            borderWidth: 0.25,
            borderColor: isDarkMode
              ? 'rgba(255,255,255,0.2)'
              : 'rgba(0,0,0,0.25)',
            borderRadius: theme.spacing.md,
            padding: disablePadding ? 0 : theme.spacing.lg,
            overflow: 'hidden',
          },
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
};
export default BaseCard;
