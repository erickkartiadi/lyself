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
          shadowColor: 'rgba(0,0,0,0.08)',
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 1,
          elevation: 1,
          borderWidth: 0.25,
          borderColor: isDarkMode
            ? 'rgba(255,255,255,0.2)'
            : 'rgba(0,0,0,0.25)',
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
