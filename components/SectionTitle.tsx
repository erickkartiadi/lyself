import { Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

import LinkButton from './LinkButton';

interface SectionTitleProps {
  title: string;
  screen?: string;
  showRightButton?: boolean;
  rightButtonComponent?: React.ReactNode;
}

function SectionTitle({
  title,
  showRightButton,
  rightButtonComponent,
  screen = 'InDevelopment',
}: SectionTitleProps) {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
      }}
    >
      <>
        <Text h4 h4Style={{ marginBottom: 0 }}>
          {title}
        </Text>
        {showRightButton && !rightButtonComponent && (
          <LinkButton
            to={{
              screen: showRightButton && screen && screen,
            }}
            color="primary"
          >
            See More{' '}
          </LinkButton>
        )}
        {showRightButton && rightButtonComponent && (
          <View>{rightButtonComponent}</View>
        )}
      </>
    </View>
  );
}

SectionTitle.defaultProps = {
  showRightButton: false,
  rightButtonComponent: null,
  screen: 'InDevelopment',
};

export default SectionTitle;
