import { ThemeSpacing } from '@rneui/base';
import { Card, CardProps, useTheme } from '@rneui/themed';
import * as React from 'react';
import { FlexStyle, StyleProp, ViewStyle } from 'react-native';

import { BORDER_RADIUS } from '../../theme/styles';
import { ThemeModeContext } from '../../theme/ThemeModeContext';
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
            padding: enableCardPadding ? theme.spacing[cardPadding] : 0,
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
  enableCardPadding: true,
  width: '100%',
  cardPadding: 'xl',
  cardStyle: {},
  containerStyle: {},
};
export default BaseCard;
