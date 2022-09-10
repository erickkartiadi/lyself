import { Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';

import LinkButton from './LinkButton';

interface SectionTitleProps {
  title: string;
  screen?: string;
  showRightComponent?: boolean;
  rightComponent?: React.ReactNode;
}

function SectionTitle({
  title,
  showRightComponent,
  rightComponent,
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
        <Text subtitle style={{ flex: 1 }}>
          {title}
        </Text>
        {showRightComponent && !rightComponent ? (
          <LinkButton
            style={{ flexShrink: 1, alignItems: 'flex-end' }}
            to={{
              screen: showRightComponent && screen && screen,
            }}
            color="primary"
          >
            See All
          </LinkButton>
        ) : (
          rightComponent && rightComponent
        )}
      </>
    </View>
  );
}

SectionTitle.defaultProps = {
  showRightComponent: false,
  rightComponent: null,
  screen: 'InDevelopment',
};

export default SectionTitle;
