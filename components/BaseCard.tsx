import * as React from 'react';
import { Card, CardProps, useTheme } from '@rneui/themed';
import { ThemeModeContext } from '../theme/ThemeModeContext';

function BaseCard({
  children,
  wrapperStyle,
  containerStyle,
}: React.PropsWithChildren<CardProps>) {
  const { theme } = useTheme();
  const { isDarkMode } = React.useContext(ThemeModeContext);
  return (
    <Card
      containerStyle={[
        {
          backgroundColor: theme.colors.cardBackground,
          shadowColor: 'rgba(0, 0, 0, 0.175)',
          shadowOffset: { width: 4, height: 12 },
          shadowRadius: 4,
          elevation: 4,
          borderWidth: isDarkMode ? 0.275 : 0,
          borderRadius: theme.spacing.md,
        },
        containerStyle,
      ]}
      wrapperStyle={wrapperStyle}
    >
      {children}
    </Card>
  );
}

export default BaseCard;
