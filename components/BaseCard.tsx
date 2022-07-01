import * as React from 'react';
import { Card, CardProps, useTheme } from '@rneui/themed';
import { themeSpacing } from '@rneui/themed/dist/config/ThemeProvider';

function BaseCard({
  children,
  wrapperStyle,
  containerStyle,
}: React.PropsWithChildren<CardProps>) {
  const { theme } = useTheme();

  return (
    <Card
      containerStyle={[
        {
          backgroundColor: theme.colors.cardBackground,
          elevation: 0.1,
          borderWidth: 0,
          borderRadius: themeSpacing.md,
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
