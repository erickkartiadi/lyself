import * as React from 'react';
import { Card, CardProps, useTheme, useThemeMode } from '@rneui/themed';

function BaseCard({
  children,
  wrapperStyle,
  containerStyle,
}: React.PropsWithChildren<CardProps>) {
  const { theme } = useTheme();
  const { mode } = useThemeMode();

  return (
    <Card
      containerStyle={[
        {
          backgroundColor:
            mode === 'light'
              ? theme.colors.background
              : theme.colors.cardBackground,
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
