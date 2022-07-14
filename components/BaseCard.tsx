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
          backgroundColor: isDarkMode
            ? theme.colors.cardBackground
            : theme.colors.background,
          elevation: 0.5,
          borderWidth: 0.25,
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
